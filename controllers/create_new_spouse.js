require("dotenv").config();
const models = require("../models");
const uuid_family_tree = process.env.TEMP_UUID_FAMILY_TREE;

exports.create_new_spouse = (req, res) => {
  let targetSpouse = null;
  let newSpouse = null;

  if (req.body.ns_gender === "Male") {
    targetSpouse = "bride";
    newSpouse = "groom";
  } else {
    targetSpouse = "groom";
    newSpouse = "bride";
  }

  return models.family_member
    .create({
      first_name: req.body.first_name,
      middle_name: req.body.middle_name,
      last_name: req.body.last_name,
      gender: req.body.ns_gender,
      uuid_family_tree: uuid_family_tree,
    })
    .then((resp) => {
      return JSON.parse(JSON.stringify(resp));
    })
    .then((res) => {
      models.marriages.create({
        [newSpouse]: res.uuid_family_member,
        [targetSpouse]: req.body.uuid_target,
        d_o_mar: req.body.d_o_mar.split("T")[0],
        uuid_family_tree: uuid_family_tree,
      });
    })
    .then((resp) => {
      res.json(resp);
    });
};
