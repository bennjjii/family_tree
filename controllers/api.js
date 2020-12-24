const models = require("../models");
const { Op } = require("sequelize");
const { response } = require("express");

exports.get_home = function (req, res) {
  res.render("index", { title: "Express" });
};

exports.get_fam = function (req, res) {
  return models.family_member.findAll().then((familymembers) => {
    //console.log(familymembers);
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
      //console.log(family_member);
      res.json(family_member);
    });
};

exports.get_data = function (req, res) {
  const dataChunk = {
    uuid: null,
    firstName: "",
    middleName: "",
    lastName: "",
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

  //get target name and details

  models.family_member
    .findOne({
      where: {
        uuid_family_member: req.params.id,
      },
    })
    .then((resp) => {
      const { uuid_family_member, first_name, middle_name, last_name, gender } =
        resp.dataValues || {};
      dataChunk.uuid = uuid_family_member;
      dataChunk.firstName = first_name;
      dataChunk.middleName = middle_name;
      dataChunk.lastName = last_name;
      dataChunk.gender = gender;
    });

  //get birthday and parents

  models.birth
    .findOne({
      where: {
        child: req.params.id,
      },
    })
    .then((resp) => {
      const { d_o_b, mother, father } = resp.dataValues || {};
      dataChunk.d_o_b = d_o_b;
      if (mother) {
        models.family_member
          .findOne({
            where: {
              uuid_family_member: mother,
            },
          })
          .then((resp) => {
            //console.log(res.dataValues);
            dataChunk.motherName = [
              resp.dataValues.first_name,
              resp.dataValues.middle_name,
              resp.dataValues.last_name,
              resp.dataValues.uuid_family_member,
            ];
          });
      }

      if (father) {
        models.family_member
          .findOne({
            where: {
              uuid_family_member: father,
            },
          })
          .then((resp) => {
            dataChunk.fatherName = [
              resp.dataValues.first_name,
              resp.dataValues.middle_name,
              resp.dataValues.last_name,
              resp.dataValues.uuid_family_member,
            ];
          });
      }
    });

  //get marriages

  models.marriage
    .findAll({
      where: {
        [Op.or]: [{ bride: req.params.id }, { groom: req.params.id }],
      },
    })
    .then((resp) => {
      resp.map((item, index) => {
        const { d_o_mar, place, bride, groom } = item.dataValues;
        models.family_member
          .findOne({
            where: {
              uuid_family_member: bride == req.params.id ? groom : bride,
            },
          })
          .then((resp) => {
            dataChunk.marriages[index].spouse = [
              resp.dataValues.first_name,
              resp.dataValues.middle_name,
              resp.dataValues.last_name,
              resp.dataValues.uuid_family_member,
            ];
          });
        res.json(dataChunk);
      });
    });
};

/////////////////////////////////////////////////////
/////////////////////////////////////////////////////
/////////////////////////////////////////////////////

exports.get_birth = function (req, res) {
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
            birth_response.mother = [
              first_name,
              middle_name,
              last_name,
              uuid_family_member,
            ];
          } else {
            birth_response.father = [
              first_name,
              middle_name,
              last_name,
              uuid_family_member,
            ];
          }
        });

        res.json(birth_response);
      });
    });
};

exports.create_family_account = function (req, res) {
  const acc_name = req.body["acc_name"];
  return models.family_account
    .create({ family_account_name: acc_name })
    .then(res.json("Family account created!"))
    .catch((err) => res.status(400).json("Error:" + err));
};
