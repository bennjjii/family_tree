const models = require("../models");

exports.create_new_spouse = async (req, res) => {
  console.log(req.body);
  let newSpouse, updatedChildren;
  try {
    if (req.body.selected_parent === null) {
      newSpouse = JSON.parse(
        JSON.stringify(
          await models.family_member.create({
            first_name: req.body.first_name,
            middle_name: req.body.middle_name,
            last_name: req.body.last_name,
            gender: req.body.target_gender === "Male" ? "Female" : "Male",
            d_o_b: req.body.d_o_b,
            uuid_family_tree: req.user.uuid_family_tree,
          })
        )
      );
      if (req.body.add_existing_children) {
        updatedChildren = await req.body.existing_children.map((child) => {
          return models.family_member.update(
            {
              [req.body.target_gender === "Male"
                ? "mother"
                : "father"]: newSpouse.uuid_family_member,
            },
            {
              where: {
                uuid_family_member: child,
              },
            }
          );
        });
      }
    }

    const newMarriage = JSON.parse(
      JSON.stringify(
        await models.marriage.create({
          bride:
            req.body.target_gender === "Female"
              ? req.body.uuid_target
              : req.body.selected_parent
              ? req.body.selected_parent
              : newSpouse.uuid_family_member,
          groom:
            req.body.target_gender === "Male"
              ? req.body.uuid_target
              : req.body.selected_parent
              ? req.body.selected_parent
              : newSpouse.uuid_family_member,
          d_o_mar: req.body.d_o_mar,
          uuid_family_tree: req.user.uuid_family_tree,
        })
      )
    );
    console.log(newSpouse);
    console.log(updatedChildren);
    console.log(newMarriage);
    res.sendStatus(200);
  } catch (err) {
    console.log(err);
    res.sendStatus(403);
  }
};
