const models = require("../models");
const { Op } = require("sequelize");

exports.get_target_data = async (req, res) => {
  try {
    const target = JSON.parse(
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

    target.children = JSON.parse(
      JSON.stringify(
        await models.family_member.findAll({
          where: {
            [Op.or]: [
              { mother: target.uuid_family_member },
              { father: target.uuid_family_member },
            ],
          },
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
    console.log(target);
    res.json(target);
  } catch (err) {
    console.log(err);
    res.sendStatus(403);
  }
};
