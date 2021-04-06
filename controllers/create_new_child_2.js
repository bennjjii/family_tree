const models = require("../models");

exports.create_new_child = async (req, res) => {
  console.log(req.body);
  try {
    const newChild = await models.family_member.create({
      first_name: req.body.first_name,
      middle_name: req.body.middle_name,
      last_name: req.body.last_name,
      gender: req.body.gender,
      d_o_b: req.body.d_o_b,
      father: req.body.father,
      mother: req.body.mother,
      uuid_family_tree: req.user.uuid_family_tree,
    });
    res.sendStatus(200);
  } catch (err) {
    res.sendStatus(403);
  }
};
