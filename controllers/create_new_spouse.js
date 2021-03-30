const models = require("../models");

exports.create_new_spouse = async (req, res) => {
  let targetSpouseLabel = "groom";
  let newSpouseLabel = "bride";

  req.body.gender === "Male"
    ? (targetSpouseLabel = "bride")
    : (newSpouseLabel = "groom");

  // these should be handled with an include like in create_new_child

  try {
    let newSpouse = await models.family_member.create({
      first_name: req.body.first_name,
      middle_name: req.body.middle_name,
      last_name: req.body.last_name,
      gender: req.body.gender,
      uuid_family_tree: req.user.uuid_family_tree,
    });

    newSpouse = await JSON.parse(JSON.stringify(newSpouse));

    const newMarriage = await models.marriage.create({
      [newSpouseLabel]: newSpouse.uuid_family_member,
      [targetSpouseLabel]: req.body.uuid_target,
      d_o_mar: req.body.d_o_mar.split("T")[0],
      uuid_family_tree: req.user.uuid_family_tree,
    });

    res.json(newSpouse);
  } catch (err) {
    console.log(err);
    res.sendStatus(404);
  }
};
