const models = require("../models");

exports.create_new_parent = async (req, res) => {
  console.log(req.body);
  let parent = null;
  try {
    if (req.body.existing_parent === "new") {
      console.log("new");
      parent = JSON.parse(
        JSON.stringify(
          await models.family_member.create({
            first_name: req.body.first_name,
            middle_name: req.body.middle_name,
            last_name: req.body.last_name,
            gender: req.body.gender,
            d_o_b: req.body.d_o_b,
            //this comes from the JWT and so protects cross account modifications
            uuid_family_tree: req.user.uuid_family_tree,
          })
        )
      );
    } else {
      //console.log(req.body.existing_parent);
      parent = JSON.parse(
        JSON.stringify(
          await models.family_member.findOne({
            where: {
              uuid_family_member: req.body.existing_parent,
            },
          })
        )
      );
    }

    const updateChildWithParent = JSON.parse(
      JSON.stringify(
        await models.family_member.update(
          {
            [parent.gender === "Male" ? "father" : "mother"]:
              parent.uuid_family_member,
            //this comes from the JWT and so protects cross account modifications
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

    if (req.body.marriage_checked && !req.body.already_married_to_selected) {
      const newMarriage = JSON.parse(
        JSON.stringify(
          await models.marriage.create({
            d_o_mar: req.body.d_o_mar,
            //this comes from the JWT and so protects cross account modifications
            uuid_family_tree: req.user.uuid_family_tree,
            bride: req.body.bride ? req.body.bride : parent.uuid_family_member,
            groom: req.body.groom ? req.body.groom : parent.uuid_family_member,
          })
        )
      );
      console.log(newMarriage);
    }

    console.log(parent);
    console.log(updateChildWithParent);
    return res.sendStatus(200);
  } catch (err) {
    console.log(err);
    return res.sendStatus(403);
  }
};
