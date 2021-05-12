const models = require("../models");

exports.edit_marriage = async (req, res) => {
  console.log(req.body.target_to_edit);
  let { uuid_marriage, d_o_mar } = req.body.target_to_edit;

  let editedMarriage = await models.marriage.update(
    {
      d_o_mar,
    },
    { where: { uuid_marriage } }
  );
  return res.sendStatus(200);
};
