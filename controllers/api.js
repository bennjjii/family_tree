const models = require("../models");
const { Op } = require("sequelize");
const { response } = require("express");
const uuid_family_tree = "58ae4e8f-bd4e-482c-959c-747a97d1e2dc";
const validator = require("validator");

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
      res.json(respData);
    });
};

exports.create_new_child = (req, res) => {
  //console.log(req);
  return models.birth
    .create(
      {
        d_o_b: req.body.d_o_b.split("T")[0],
        mother: req.body.mother,
        father: req.body.father,
        chil: {
          first_name: req.body.first_name,
          middle_name: req.body.middle_name,
          last_name: req.body.last_name,
          gender: req.body.gender,
          uuid_family_tree: uuid_family_tree,
        },
        uuid_family_tree: uuid_family_tree,
      },

      {
        include: [
          {
            model: models.family_member,
            as: "chil",
          },
        ],
      }
    )
    .then((resp) => {
      console.log(resp);
      res.json(resp.chil);
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
