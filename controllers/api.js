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
      const respData = {
        target: {
          name: ["", "", ""],
          uuid: "",
          gender: null,
          born: null,
          birth_uuid: null,
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
      respData.target.birth_uuid = resp.dataValues.chil.uuid_birth;
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
    })
    .catch(console.log("Error occured"));
};

exports.create_new_child = (req, res) => {
  console.log(req);
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
      res.json(resp);
    });
};

exports.create_new_parent = (req, res) => {
  let genderSelecto = null;
  let genderSelector = null;
  let responses = [];

  if (req.body.np_gender === "Male") {
    genderSelecto = "fathe";
    genderSelector = "father";
  } else {
    genderSelecto = "mothe";
    genderSelector = "mother";
  }

  return models.family_member
    .create({
      first_name: req.body.np_first_name,
      middle_name: req.body.np_middle_name,
      last_name: req.body.np_last_name,
      gender: req.body.np_gender,
      uuid_family_tree: uuid_family_tree,
    })
    .then((parent) => {
      responses.push(JSON.parse(JSON.stringify(parent)));
      return models.birth.update(
        {
          [genderSelector]: responses[0].uuid_family_member,
        },
        {
          where: {
            uuid_birth: req.body.uuid_birth,
          },
        }
      );
    })
    .then((resp) => {
      responses.push(JSON.parse(JSON.stringify(resp)));

      return models.birth.create({
        child: responses[0].uuid_family_member,
        d_o_b: req.body.d_o_b ? req.body.d_o_b.split("T")[0] : null,
        uuid_family_tree: uuid_family_tree,
      });
    })
    .then((resp) => {
      responses.push(JSON.parse(JSON.stringify(resp)));
      let response = {
        [genderSelector]: {
          name: [
            responses[0].first_name,
            responses[0].middle_name,
            responses[0].last_name,
          ],
          uuid: responses[0].uuid_family_member,
        },
      };
      res.json(response);
    });
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
