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
