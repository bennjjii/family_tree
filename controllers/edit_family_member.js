const models = require("../models");

exports.edit_family_member = async (req, res) => {
  console.log(req.body);
  // let editedFamilyMember = await models.family_member.update({
  //     someStuff: newStuff
  // },
  // {
  //   where: {age: 7},
  //   returning: true, // needed for affectedRows to be populated
  //   plain: true // makes sure that the returned instances are just plain objects
  // })
};
