const models = require("../models");

const get_settings = async (req, res) => {
  console.log(req.user);
  try {
    //let { uuid_family_tree } = req.user;
    let { uuid_family_tree } = req.user;
    let { isPublic, publicName } = await models.family_tree.findOne({
      where: {
        uuid_family_tree,
      },
    });
    console.log({
      isPublic,
      publicName,
    });
    res.json({
      isPublic,
      publicName,
    });
  } catch (err) {
    console.log(err);
    res.sendStatus(404);
  }
};

const set_settings = async (req, res) => {
  //how do we check if name is already taken?
  //it has unique constraint so just let it error out
  //just because user gets past authenticate token
  //doesn't mean they have the right to change family tree permissions
  try {
    console.log(req.user);
    let { uuid_family_tree } = req.user;
    //let { uuid_family_tree } = req.body;
    let { isPublic, publicName } = req.body;

    let updatedSettings = await models.family_tree.update(
      {
        isPublic,
        publicName,
      },
      {
        where: {
          uuid_family_tree,
        },
        returning: true, // needed for affectedRows to be populated
        plain: true, // makes sure that the returned instances are just plain objects
      }
    );
    console.log(updatedSettings);
    res.send(200);
  } catch (err) {
    // console.log("Error: " + err.name);
    // console.log(Object.keys(err));
    if (err.name === "SequelizeUniqueConstraintError") {
      res.sendStatus(403);
    } else {
      res.sendStatus(404);
    }
  }
};

module.exports = {
  get_settings,
  set_settings,
};
