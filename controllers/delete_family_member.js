const models = require("../models");

//this will delete entire chain above delete family member

exports.delete_family_member = async (req, res) => {
  console.log(req.body);
  const deletedFamilyMember = await models.family_member.destroy({
    where: {
      uuid_family_member: req.body.target_to_delete,
    },
  });

  // const removeAsMotherOrFather = await models.family_member.update({
  //   where: {

  //   }
  // })
  return res.sendStatus(204);
};
