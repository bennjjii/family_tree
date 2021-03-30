const models = require("../models");

exports.create_new_child = (req, res) => {
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
          uuid_family_tree: req.user.uuid_family_tree,
        },
        uuid_family_tree: req.user.uuid_family_tree,
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
