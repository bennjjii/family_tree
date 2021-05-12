const models = require("../models");

exports.edit_family_member = async (req, res) => {
  let { first_name, middle_name, last_name, d_o_b, uuid_family_member } =
    req.body.target_to_edit;

  console.log(middle_name);
  let editedFamilyMember = await models.family_member.update(
    {
      first_name,
      middle_name,
      last_name,
      d_o_b,
    },
    {
      where: { uuid_family_member },
      returning: true, // needed for affectedRows to be populated
      plain: true, // makes sure that the returned instances are just plain objects
    }
  );
  console.log(editedFamilyMember);
};
