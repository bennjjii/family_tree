const models = require("../models");
const { Op } = require("sequelize");
const { response } = require("express");
const uuid_family_tree = "58ae4e8f-bd4e-482c-959c-747a97d1e2dc";
const validator = require("validator");
const { sequelize } = require("../models");
const bcrypt = require("bcrypt");

exports.register = async function (req, res) {
  let hashedPassword;
  try {
    const salt = await bcrypt.genSalt();
    hashedPassword = await bcrypt.hash(req.body.password, salt);
  } catch {
    res.status(500).send();
  }

  return models.user
    .create({
      username: req.body.username,
      email: req.body.email,
      hashed_password: hashedPassword,
      super_user: false,
    })
    .then((resp) => {
      res.json(resp);
      console.log(resp);
    });
};

exports.login = async function (req, res) {
  let hashedPassword;
  await models.user
    .findOne({
      where: {
        username: req.body.username,
      },
    })
    .then((resp) => {
      hashedPassword = resp.dataValues.hashed_password;
    });

  try {
    if (await bcrypt.compare(req.body.password, hashedPassword)) {
      console.log("Success");
    } else {
      console.log("Not Allowed");
    }
  } catch {
    res.status(500).send();
  }
};

exports.create_new_spouse = (req, res) => {
  let targetSpouse = null;
  let newSpouse = null;

  if (req.body.ns_gender === "Male") {
    targetSpouse = "bride";
    newSpouse = "groom";
  } else {
    targetSpouse = "groom";
    newSpouse = "bride";
  }

  return models.family_member
    .create({
      first_name: req.body.first_name,
      middle_name: req.body.middle_name,
      last_name: req.body.last_name,
      gender: req.body.ns_gender,
      uuid_family_tree: uuid_family_tree,
    })
    .then((resp) => {
      return JSON.parse(JSON.stringify(resp));
    })
    .then((res) => {
      models.marriages.create({
        [newSpouse]: res.uuid_family_member,
        [targetSpouse]: req.body.uuid_target,
        d_o_mar: req.body.d_o_mar.split("T")[0],
        uuid_family_tree: uuid_family_tree,
      });
    })
    .then((resp) => {
      res.json(resp);
    });
};

exports.create_family_member = function (req, res) {
  console.log(req);
  return models.family_member
    .create({
      first_name: req.body.first_name,
      middle_name: req.body.middle_name,
      last_name: req.body.last_name,
      gender: req.body.gender,
      uuid_family_tree: uuid_family_tree,
    })
    .then((response) => {
      console.log(response);
      if (validator.isISO8601(req.body.d_o_b)) {
        models.birth
          .create({
            d_o_b: req.body.d_o_b.split("T")[0],
            child: response.dataValues.uuid_family_member,
            uuid_family_tree: uuid_family_tree,
          })
          .then((response) => {
            console.log(response);
            return res.status(200);
          });
      }
    });
};

exports.create_family_account = function (req, res) {
  const acc_name = req.body["acc_name"];
  return models.family_account
    .create({ family_account_name: acc_name })
    .then(res.json("Family account created!"))
    .catch((err) => res.status(400).json("Error:" + err));
};
