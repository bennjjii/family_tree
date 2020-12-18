const models = require("../models");

exports.get_home = function (req, res) {
  res.render("index", { title: "Express" });
};

exports.get_fam = function (req, res) {
  return models.family_member.findAll().then((familymembers) => {
    console.log(familymembers);
    res.json(familymembers);
  });
};

exports.create_family_account = function (req, res) {
  const acc_name = req.body["acc_name"];
  return models.family_account
    .create({ family_account_name: acc_name })
    .then(res.json("Family account created!"))
    .catch((err) => res.status(400).json("Error:" + err));
};
