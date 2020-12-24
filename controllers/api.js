const models = require("../models");
const { Op } = require("sequelize");

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
    .then((res) => {
      const { uuid_family_member, first_name, middle_name, last_name, gender } =
        res.dataValues || {};
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
    .then((res) => {
      const { d_o_b, mother, father } = res.dataValues || {};
      dataChunk.d_o_b = d_o_b;
      if (mother) {
        models.family_member
          .findOne({
            where: {
              uuid_family_member: mother,
            },
          })
          .then((res) => {
            //console.log(res.dataValues);
            dataChunk.motherName = [
              res.dataValues.first_name,
              res.dataValues.middle_name,
              res.dataValues.last_name,
              res.dataValues.uuid_family_member,
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
          .then((res) => {
            dataChunk.fatherName = [
              res.dataValues.first_name,
              res.dataValues.middle_name,
              res.dataValues.last_name,
              res.dataValues.uuid_family_member,
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
    .then((res) => {
      res.map((item, index) => {
        const { d_o_mar, place, bride, groom } = item.dataValues;
        models.family_member
          .findOne({
            where: {
              uuid_family_member: bride == req.params.id ? groom : bride,
            },
          })
          .then((res) => {
            dataChunk.marriages[index].spouse = [
              res.dataValues.first_name,
              res.dataValues.middle_name,
              res.dataValues.last_name,
              res.dataValues.uuid_family_member,
            ];
            console.log(dataChunk.marriages[index]);
          });
        //console.log(item.dataValues);
      });
    });
};

/////////////////////////////////////////////////////
/////////////////////////////////////////////////////
/////////////////////////////////////////////////////

exports.get_birth = function (req, res) {
  let birth_response = {};
  models.birth
    .findOne({
      where: {
        child: req.params.id,
      },
    })
    .then((res) => {
      const { d_o_b, mother, father } = res.dataValues;

      birth_response.d_o_b = d_o_b;

      models.family_member
        .findOne({
          where: {
            uuid_family_member: mother,
          },
        })
        .then((res) => {
          console.log(res);
        });
      birth_response.mother = res.dataValues.first_name;
      console.log(birth_response);
    });

  console.log(birth_response);
};

exports.create_family_account = function (req, res) {
  const acc_name = req.body["acc_name"];
  return models.family_account
    .create({ family_account_name: acc_name })
    .then(res.json("Family account created!"))
    .catch((err) => res.status(400).json("Error:" + err));
};
