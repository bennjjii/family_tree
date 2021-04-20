const models = require("../models");

exports.delete_marriage = async (req, res) => {
  let deletedMarriage = await models.marriage.destroy({
    where: {
      uuid_marriage: req.body.target_to_delete,
    },
  });
  console.log(deletedMarriage);

  return res.sendStatus(204);
};
