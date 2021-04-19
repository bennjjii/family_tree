const models = require("../models");
const { Op } = require("sequelize");

exports.get_target_data = async (req, res) => {
  let target = {};
  try {
    //change all routes to use destructuring rather than this parse stringify
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
            },
            {
              model: models.family_member,
              as: "fathe",
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

    target.children = JSON.parse(
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
