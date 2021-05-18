const models = require("../models");

const getSettings = async (req, res) => {
  console.log(req.user);
  try {
    //let { uuid_family_tree } = req.user;
    let { uuid_family_tree } = req.body;
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

const setSettings = async (req, res) => {
  //how do we check if name is already taken?
  //it has unique constraint so just let it error out
  try {
    console.log(req.body);
    //let { uuid_family_tree } = req.user;
    let { uuid_family_tree } = req.body;
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
      res.send("not_unique");
    } else {
      res.sendStatus(404);
    }
  }
};

module.exports = {
  getSettings,
  setSettings,
};
