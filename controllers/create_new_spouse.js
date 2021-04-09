const models = require("../models");

exports.create_new_spouse = async (req, res) => {
  try {
    res.sendStatus(200);
  } catch (err) {
    console.log(err);
    res.sendStatus(403);
  }
};
