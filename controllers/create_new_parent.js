const models = require("../models");

//this also needs to check user is not cross posting to another user's data area
//this should give the option to also create a marriage if a second parent is available

exports.create_new_parent = async (req, res) => {
  console.log(req.body);

  try {
    const newParent = JSON.parse(
      JSON.stringify(
        await models.family_member.create({
          first_name: req.body.first_name,
          middle_name: req.body.middle_name,
          last_name: req.body.last_name,
          gender: req.body.gender,
          d_o_b: req.body.d_o_b,
          uuid_family_tree: req.user.uuid_family_tree,
        })
      )
    );

    const updateChildWithNewParent = JSON.parse(
      JSON.stringify(
        await models.family_member.update(
          {
            [newParent.gender === "Male"
              ? "father"
              : "mother"]: newParent.uuid_family_member,
            uuid_family_tree: req.user.uuid_family_tree,
          },
          {
            where: {
              uuid_family_member: req.body.uuid_target,
            },
          }
        )
      )
    );

    if (req.body.generate_marriage) {
      const newMarriage = JSON.parse(
        JSON.stringify(
          await models.marriage.create({
            d_o_mar: req.body.d_o_mar,
            uuid_family_tree: req.user.uuid_family_tree,
            bride: req.body.bride
              ? req.body.bride
              : newParent.uuid_family_member,
            groom: req.body.groom
              ? req.body.groom
              : newParent.uuid_family_member,
          })
        )
      );
      console.log(newMarriage);
    }

    console.log(newParent);
    console.log(updateChildWithNewParent);
    return res.sendStatus(200);
  } catch (err) {
    console.log(err);
    return res.sendStatus(403);
  }
};
