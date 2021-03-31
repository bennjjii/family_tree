const models = require("../models");

exports.create_new_spouse = async (req, res) => {
  let targetSpouseLabel = "groom";
  let newSpouseLabel = "bride";

  if (req.body.gender === "Male") {
    targetSpouseLabel = "bride";
    newSpouseLabel = "groom";
  }

  // these should be handled with an include like in create_new_child

  console.log(targetSpouseLabel + "----" + newSpouseLabel);

  try {
    const newMarriage = await models.marriage.create(
      {
        [targetSpouseLabel]: req.body.uuid_target,
        d_o_mar: req.body.d_o_mar.split("T")[0],
        uuid_family_tree: req.user.uuid_family_tree,
        [newSpouseLabel.slice(0, -1)]: {
          first_name: req.body.first_name,
          middle_name: req.body.middle_name,
          last_name: req.body.last_name,
          gender: req.body.gender,
          uuid_family_tree: req.user.uuid_family_tree,
        },
      },
      {
        include: {
          model: models.family_member,
          as: newSpouseLabel.slice(0, -1),
        },
      }
    );

    const response = {
      name: [
        newMarriage[newSpouseLabel.slice(0, -1)].dataValues.first_name,
        newMarriage[newSpouseLabel.slice(0, -1)].dataValues.middle_name,
        newMarriage[newSpouseLabel.slice(0, -1)].dataValues.last_name,
      ],
      gender: newMarriage[newSpouseLabel.slice(0, -1)].dataValues.gender,
      uuid:
        newMarriage[newSpouseLabel.slice(0, -1)].dataValues.uuid_family_member,
      d_o_mar: newMarriage.dataValues.d_o_mar,
    };

    console.log(response);

    res.json(response);
  } catch (err) {
    console.log(err);
    res.sendStatus(404);
  }
};
