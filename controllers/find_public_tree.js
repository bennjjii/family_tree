const models = require("../models");

const find_public_tree = async (req, res) => {
  console.log(req.params.publicTreeName);

  let publicTree = await models.family_tree.findOne({
    where: {
      publicName: req.params.publicTreeName,
    },
  });
  if (publicTree && publicTree.dataValues.isPublic) {
    let { uuid_family_tree, focal_member, publicName } = publicTree.dataValues;
    let response = {
      uuid_family_tree,
      focal_member,
      publicName,
    };
    console.log(response);
    res.json(response);
  } else {
    res.sendStatus(404);
  }
};

module.exports = {
  find_public_tree,
};
