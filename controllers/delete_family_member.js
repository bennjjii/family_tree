const models = require("../models");

//this should delete entire chain above deleted family member

exports.delete_family_member = async (req, res) => {
  console.log(req.body);
  let deletedFamilyMember = await models.family_member.destroy({
    where: {
      uuid_family_member: req.body.target_to_delete,
    },
  });

  console.log(deletedFamilyMember);

  return res.sendStatus(204);
};
