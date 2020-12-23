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

exports.get_family_member = function (req, res) {
  return models.family_member
    .findOne({
      where: {
        uuid_family_member: req.params.id,
      },
    })
    .then((family_member) => {
      console.log(family_member);
      res.json(family_member);
    });
};

exports.get_data = function (req, res) {
  const dataChunk = {
    fullName: "",
    gender: "",
    d_o_b: null,
    d_o_d: null,
    motherName: null,
    fatherName: null,
    children: [{ childName: null, born: null }],
    marriages: [
      { spouse: null, startDate: null, endDate: null, location: null },
    ],
  };
  return models.family_member
    .findOne({
      where: {
        uuid_family_member: req.params.id,
      },
    })
    .then((family_member) => {
      console.log(family_member);
      res.json(family_member);
    })
    .catch((err) => res.json(err));
};

exports.get_birth = function (req, res) {
  return models.birth
    .findOne({
      where: {
        child: req.params.id,
      },
    })
    .then((birth) => {
      console.log(birth);
      res.json(birth);
    });
};

exports.create_family_account = function (req, res) {
  const acc_name = req.body["acc_name"];
  return models.family_account
    .create({ family_account_name: acc_name })
    .then(res.json("Family account created!"))
    .catch((err) => res.status(400).json("Error:" + err));
};
