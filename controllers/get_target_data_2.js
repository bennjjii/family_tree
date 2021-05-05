const models = require("../models");
const { Op } = require("sequelize");

//we need to identify the outside of the graph, and pass up a flag whether
//a family member can be deleted in their current position
//we need to check for both parents and all children

exports.get_target_data = async (req, res) => {
  let target = {};
  try {
    //change all routes to use destructuring rather than this parse stringify
    //might also be able to pass plain = true
    target = JSON.parse(
      JSON.stringify(
        await models.family_member.findOne({
          where: {
            uuid_family_member: req.body.target,
          },
          include: [
            {
              model: models.family_member,
              as: "mothe",
              include: [
                {
                  model: models.family_member,
                  as: "mothe",
                },
                {
                  model: models.family_member,
                  as: "fathe",
                },
              ],
            },
            {
              model: models.family_member,
              as: "fathe",
              include: [
                {
                  model: models.family_member,
                  as: "mothe",
                },
                {
                  model: models.family_member,
                  as: "fathe",
                },
              ],
            },
          ],
        })
      )
    );

    //need this to support edge case where we need to add a target's mother or father from their other siblings
    if (target.mothe) {
      target.siblingsViaMother = JSON.parse(
        JSON.stringify(
          await models.family_member.findAll({
            where: {
              mother: target.mothe.uuid_family_member,
            },
            include: [
              {
                model: models.family_member,
                as: "fathe",
              },
            ],
          })
        )
      );

      target.mothersHusband = JSON.parse(
        JSON.stringify(
          await models.marriage.findAll({
            where: {
              bride: target.mothe.uuid_family_member,
            },
            include: [
              {
                model: models.family_member,

                as: "groo",
              },
            ],
          })
        )
      );
      // if (target.mothersHusband.length === 0) {
      //   target.mothersHusband = null;
      // }
    }

    if (target.fathe) {
      target.siblingsViaFather = JSON.parse(
        JSON.stringify(
          await models.family_member.findAll({
            where: {
              father: target.fathe.uuid_family_member,
            },
            include: [
              {
                model: models.family_member,
                as: "mothe",
              },
            ],
          })
        )
      );
      target.fathersWife = JSON.parse(
        JSON.stringify(
          await models.marriage.findAll({
            where: {
              groom: target.fathe.uuid_family_member,
            },
            include: [
              {
                model: models.family_member,

                as: "brid",
              },
            ],
          })
        )
      );
      // if (target.fathersWife.length === 0) {
      //   target.fathersWife = null;
      // }
    }

    let children = JSON.parse(
      JSON.stringify(
        await models.family_member.findAll({
          where: {
            [Op.or]: [
              { mother: target.uuid_family_member },
              { father: target.uuid_family_member },
            ],
          },
          include: [
            {
              model: models.family_member,
              as: "mothe",
            },
            {
              model: models.family_member,
              as: "fathe",
            },
          ],
        })
      )
    );

    // this gives us children's children which we use to check if delete is okay
    target.children = await Promise.all(
      children.map(async (child) => {
        return {
          ...child,

          children: [
            ...JSON.parse(
              JSON.stringify(
                await models.family_member.findAll({
                  where: {
                    [Op.or]: [
                      { mother: child.uuid_family_member },
                      { father: child.uuid_family_member },
                    ],
                  },
                })
              )
            ),
          ],
        };
      })
    );

    target.spouses = JSON.parse(
      JSON.stringify(
        await models.marriage.findAll({
          where: {
            [Op.or]: [
              { bride: target.uuid_family_member },
              { groom: target.uuid_family_member },
            ],
          },
          include: [
            {
              model: models.family_member,

              as: target.gender === "Female" ? "groo" : "brid",
            },
          ],
        })
      )
    );

    if (req.user.uuid_family_tree !== target.uuid_family_tree) {
      throw new Error("User not authorised to access this family tree");
    }
    //console.log(target);
    res.json(target);
  } catch (err) {
    //console.log(err);
    res.sendStatus(403);
  }
};
