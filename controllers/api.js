const models = require("../models");
const { Op } = require("sequelize");
const { response } = require("express");

exports.get_home = function (req, res) {
  res.render("index", { title: "Express" });
};

exports.get_family_member = function (req, res) {
  return models.family_member
    .findOne({
      where: {
        uuid_family_member: req.params.id,
      },
    })
    .then((family_member) => {
      //console.log(family_member);
      res.json(family_member);
    });
};

exports.get_birth = function (req, res) {
  //this function is ridiculous. Look at get_marriage. Rewrite this
  //as a single query with joins and "as" aliases added to births foreign keys
  //and here. Works for now though.

  const birth_response = {};
  models.birth
    .findOne({
      where: {
        child: req.params.id,
      },
    })
    .then((resp) => {
      const { d_o_b, mother, father } = resp.dataValues;
      birth_response.d_o_b = d_o_b;
      const motherQuery = models.family_member.findOne({
        where: {
          uuid_family_member: mother,
        },
      });
      const fatherQuery = models.family_member.findOne({
        where: {
          uuid_family_member: father,
        },
      });
      Promise.all([motherQuery, fatherQuery]).then((responses) => {
        responses.map((item, index) => {
          const {
            first_name,
            middle_name,
            last_name,
            uuid_family_member,
          } = item.dataValues;
          if (index == 0) {
            birth_response.mother = {
              name: [first_name, middle_name, last_name],
              uuid: uuid_family_member,
            };
          } else {
            birth_response.father = {
              name: [first_name, middle_name, last_name],
              uuid: uuid_family_member,
            };
          }
        });

        res.json(birth_response);
      });
    });
};

exports.get_children = function (req, res) {
  const children_res = [];
  return models.birth
    .findAll({
      where: {
        [Op.or]: [{ father: req.params.id }, { mother: req.params.id }],
      },
      include: ["family_member"],
    })
    .then((resp) => {
      resp.map((item, index) => {
        const {
          first_name,
          middle_name,
          last_name,
          uuid_family_member,
        } = item.dataValues.family_member;
        const { d_o_b } = item.dataValues;
        children_res[index] = {
          name: [first_name, middle_name, last_name],
          d_o_b: d_o_b,
          uuid: uuid_family_member,
        };
      });
      res.json(children_res);
    });
};

exports.get_marriage = function (req, res) {
  return models.marriage
    .findAll({
      where: {
        [Op.or]: [{ bride: req.params.id }, { groom: req.params.id }],
      },
      include: [
        {
          model: models.family_member,
          as: "brid",
        },
        {
          model: models.family_member,
          as: "grom",
        },
      ],
    })
    .then((resp) => {
      marriage_resp = resp.map((item) => {
        const grombrid =
          req.params.id == item.dataValues.bride ? "grom" : "brid";
        const {
          first_name,
          middle_name,
          last_name,
          uuid_family_member,
        } = item.dataValues[grombrid];
        return {
          spouse: [first_name, middle_name, last_name],
          uuid: uuid_family_member,
          d_o_mar: item.dataValues.d_o_mar,
        };
      });
      console.log(marriage_resp);
      res.json(marriage_resp);
    });
};

exports.create_family_account = function (req, res) {
  const acc_name = req.body["acc_name"];
  return models.family_account
    .create({ family_account_name: acc_name })
    .then(res.json("Family account created!"))
    .catch((err) => res.status(400).json("Error:" + err));
};
