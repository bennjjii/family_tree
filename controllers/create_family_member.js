require("dotenv").config();
const models = require("../models");
const uuid_family_tree = process.env.TEMP_UUID_FAMILY_TREE;

exports.create_family_member = function (req, res) {
  console.log(req);
  return models.family_member
    .create({
      first_name: req.body.first_name,
      middle_name: req.body.middle_name,
      last_name: req.body.last_name,
      gender: req.body.gender,
      uuid_family_tree: uuid_family_tree,
    })
    .then((response) => {
      console.log(response);
      if (validator.isISO8601(req.body.d_o_b)) {
        models.birth
          .create({
            d_o_b: req.body.d_o_b.split("T")[0],
            child: response.dataValues.uuid_family_member,
            uuid_family_tree: uuid_family_tree,
          })
          .then((response) => {
            console.log(response);
            return res.status(200);
          });
      }
    });
};
