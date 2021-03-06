require("dotenv").config();
const models = require("../models");
const uuid_family_tree = process.env.TEMP_UUID_FAMILY_TREE;

exports.create_new_parent = (req, res) => {
  let genderSelecto = null;
  let genderSelector = null;
  let responses = [];

  if (req.body.np_gender === "Male") {
    genderSelecto = "fathe";
    genderSelector = "father";
  } else {
    genderSelecto = "mothe";
    genderSelector = "mother";
  }

  return models.family_member
    .create({
      first_name: req.body.np_first_name,
      middle_name: req.body.np_middle_name,
      last_name: req.body.np_last_name,
      gender: req.body.np_gender,
      uuid_family_tree: uuid_family_tree,
    })
    .then((parent) => {
      responses.push(JSON.parse(JSON.stringify(parent)));
      return models.birth.update(
        {
          [genderSelector]: responses[0].uuid_family_member,
        },
        {
          where: {
            uuid_birth: req.body.uuid_birth,
          },
        }
      );
    })
    .then((resp) => {
      responses.push(JSON.parse(JSON.stringify(resp)));

      return models.birth.create({
        child: responses[0].uuid_family_member,
        d_o_b: req.body.d_o_b ? req.body.d_o_b.split("T")[0] : null,
        uuid_family_tree: uuid_family_tree,
      });
    })
    .then((resp) => {
      responses.push(JSON.parse(JSON.stringify(resp)));
      let response = {
        [genderSelector]: {
          name: [
            responses[0].first_name,
            responses[0].middle_name,
            responses[0].last_name,
          ],
          uuid: responses[0].uuid_family_member,
        },
      };
      res.json(response);
    });
};
