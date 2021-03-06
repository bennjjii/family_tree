const models = require("../models");

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
