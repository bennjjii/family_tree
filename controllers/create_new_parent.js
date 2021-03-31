const models = require("../models");

//this also needs to check user is not cross posting to another user's data area
//this should give the option to also create a marriage if a second parent is available

exports.create_new_parent = async (req, res) => {
  let responses = [];

  let genderSelector = null;
  req.body.gender === "Male"
    ? (genderSelector = "father")
    : (genderSelector = "mother");

  try {
    const newParent = await models.family_member.create({
      first_name: req.body.first_name,
      middle_name: req.body.middle_name,
      last_name: req.body.last_name,
      gender: req.body.gender,
      uuid_family_tree: req.user.uuid_family_tree,
    });
    responses.push(JSON.parse(JSON.stringify(newParent)));
    const updatedBirth = await models.birth.update(
      {
        [genderSelector]: responses[0].uuid_family_member,
      },
      {
        where: {
          uuid_birth: req.body.uuid_birth,
        },
      }
    );

    responses.push(JSON.parse(JSON.stringify(updatedBirth)));

    const newParentBirth = await models.birth.create({
      child: responses[0].uuid_family_member,
      d_o_b: req.body.d_o_b.split("T")[0],
      uuid_family_tree: req.user.uuid_family_tree,
    });

    responses.push(JSON.parse(JSON.stringify(newParentBirth)));
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
    return res.json(response);
  } catch (err) {
    console.log(err);
    res.sendStatus(404);
  }
};
