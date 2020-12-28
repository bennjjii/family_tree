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

exports.get_target = function (req, res) {
  return models.family_member
    .findOne({
      where: {
        uuid_family_member: req.params.id,
      },
      include: [
        {
          model: models.birth,
          as: "chil",
        },
        {
          model: models.death,
          as: "die",
        },
      ],
    })
    .then((resp) => {
      const {
        first_name,
        middle_name,
        last_name,
        uuid_family_member,
      } = resp.dataValues;
      const resData = {
        name: [first_name, middle_name, last_name],
        uuid: uuid_family_member,
        d_o_b: resp.dataValues.chil
          ? resp.dataValues.chil.dataValues.d_o_b
          : null,
        d_o_d: resp.dataValues.die
          ? resp.dataValues.die.dataValues.d_o_d
          : null,
      };
      res.json(resData);
    });
};

exports.get_target_data = function (req, res) {
  return models.family_member
    .findOne({
      where: {
        uuid_family_member: req.params.id,
      },
      include: [
        {
          model: models.birth,
          as: "chil",
          include: [
            {
              model: models.family_member,
              as: "fathe",
            },
            {
              model: models.family_member,
              as: "mothe",
            },
          ],
        },
        {
          model: models.death,
          as: "die",
        },
        {
          model: models.birth,
          as: "mothe",
          include: [
            {
              model: models.family_member,
              as: "chil",
            },
          ],
        },
        {
          model: models.birth,
          as: "fathe",
          include: [
            {
              model: models.family_member,
              as: "chil",
            },
          ],
        },
        {
          model: models.marriage,
          as: "brid",
          include: [
            {
              model: models.family_member,
              as: "grom",
            },
          ],
        },
        {
          model: models.marriage,
          as: "grom",
          include: [
            {
              model: models.family_member,
              as: "brid",
            },
          ],
        },
      ],
    })
    .then((resp) => {
      //Structure of JSON response

      const respData = {
        target: {
          name: ["", "", ""],
          uuid: "",
          gender: null,
          born: null,
          died: null,
        },
        mother: {
          name: ["", "", ""],
          uuid: "",
        },
        father: {
          name: ["", "", ""],
          uuid: "",
        },
        children: [
          {
            name: ["", "", ""],
            d_o_b: null,
            uuid: "",
          },
        ],
        spouses: [
          {
            name: ["", "", ""],
            uuid: "",
            d_o_mar: null,
            d_o_div: null,
          },
        ],
      };
      let {
        first_name,
        middle_name,
        last_name,
        uuid_family_member,
      } = resp.dataValues;

      //Recover data from response

      respData.target.name = [first_name, middle_name, last_name];
      respData.target.uuid = uuid_family_member;
      respData.target.born = resp.dataValues.chil.d_o_b;
      respData.target.gender = resp.dataValues.gender;

      resp.dataValues.die
        ? (respData.target.died = resp.dataValues.die.d_o_d)
        : (respData.target.died = null);

      //parents

      if (resp.dataValues.chil.mothe) {
        ({
          first_name,
          middle_name,
          last_name,
          uuid_family_member,
        } = resp.dataValues.chil.mothe);
        respData.mother = {
          name: [first_name, middle_name, last_name],
          uuid: uuid_family_member,
        };
      } else
        respData.mother = {
          name: ["", "", ""],
          uuid: "",
        };
      if (resp.dataValues.chil.fathe) {
        ({
          first_name,
          middle_name,
          last_name,
          uuid_family_member,
        } = resp.dataValues.chil.fathe);
        respData.father = {
          name: [first_name, middle_name, last_name],
          uuid: uuid_family_member,
        };
      } else
        respData.father = {
          name: ["", "", ""],
          uuid: "",
        };
      // children
      let parentSelector;
      resp.fathe[0] ? (parentSelector = "fathe") : (parentSelector = "mothe");

      console.log(parentSelector);

      respData.children = resp.dataValues[parentSelector].map((item) => {
        ({
          first_name,
          middle_name,
          last_name,
          uuid_family_member,
        } = item.chil);
        return {
          name: [first_name, middle_name, last_name],
          uuid: uuid_family_member,
          d_o_b: item.dataValues.d_o_b,
        };
      });

      //marriages

      let spouseSelector = {};
      resp.grom[0]
        ? ([spouseSelector.target, spouseSelector.spouse] = ["grom", "brid"])
        : ([spouseSelector.target, spouseSelector.spouse] = ["brid", "grom"]);

      respData.spouses = resp[spouseSelector.target].map((item) => {
        ({
          first_name,
          middle_name,
          last_name,
          uuid_family_member,
        } = item.dataValues[spouseSelector.spouse]);

        return {
          name: [first_name, middle_name, last_name],
          uuid: uuid_family_member,
          d_o_mar: item.dataValues.d_o_mar,
          d_o_div: item.dataValues.d_o_div,
        };
      });
      console.log(resp);
      res.json(respData);
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
      include: [
        {
          model: models.family_member,
          as: "chil",
        },
      ],
    })
    .then((resp) => {
      console.log(resp[0].dataValues.chil);
      resp.map((item, index) => {
        const {
          first_name,
          middle_name,
          last_name,
          uuid_family_member,
        } = item.dataValues.chil;
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
