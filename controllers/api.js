const models = require("../models");
const { Op } = require("sequelize");
const { response } = require("express");
const uuid_family_tree = "58ae4e8f-bd4e-482c-959c-747a97d1e2dc";
const validator = require("validator");
const { sequelize } = require("../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.register = async function (req, res) {
  hashedPassword = await bcrypt.hash(req.body.password, 10);
  const createdUser = await models.family_tree.create(
    {
      family_tree_name: req.body.family_tree_name,
      use: {
        username: req.body.username,
        email: req.body.email,
        hashed_password: hashedPassword,
        super_user: false,
      },
    },
    {
      include: [
        {
          model: models.user,
          as: "use",
        },
      ],
    }
  );
  console.log(createdUser);
  res.json(createdUser);
};

exports.getAccessToken = async (req, res) => {
  try {
    const { uuid_user } = await jwt.verify(
      req.cookies.refresh_token,
      process.env.REFRESH_TOKEN_SECRET
    );

    if (uuid_user) {
      const user = await models.user.findOne({
        where: {
          uuid_user: uuid_user,
        },
      });

      // const familyTree = await models.family_tree.findOne({
      //   where: {
      //     uuid_user: user.uuid_user,
      //   },
      // });

      // console.log(familyTree);

      if (req.cookies.refresh_token === user.refresh_token) {
        const userObj = {
          uuid_user: user.uuid_user,
          username: user.username,
        };
        const accessToken = jwt.sign(userObj, process.env.ACCESS_TOKEN_SECRET, {
          expiresIn: "15m",
        });
        res.json(accessToken);
      } else {
        res.sendStatus(401);
      }
    }
  } catch (err) {
    res.sendStatus(401);
  }
};

exports.login = async function (req, res) {
  let user;
  await models.user
    .findOne({
      where: {
        username: req.body.username,
      },
    })
    .then((resp) => {
      user = resp.dataValues;
    })
    .catch((err) => {
      res.json(err);
    });

  try {
    if (await bcrypt.compare(req.body.password, user.hashed_password)) {
      const userObj = { uuid_user: user.uuid_user, username: user.username };
      const refreshToken = jwt.sign(userObj, process.env.REFRESH_TOKEN_SECRET);
      let updatedUser = await models.user.update(
        {
          refresh_token: refreshToken,
        },
        {
          where: {
            uuid_user: user.uuid_user,
          },
        }
      );
      res.cookie("refresh_token", refreshToken, {
        httpOnly: true,
        sameSite: "strict",
        //add path restriction
      });
      res.json({ auth: true });
    } else {
      console.log("Not Allowed");
    }
  } catch {
    res.status(500).send();
  }
};

exports.logout = async (req, res) => {
  await models.user
    .update(
      {
        refresh_token: "",
      },
      {
        where: {
          username: req.body.username,
        },
      }
    )
    .then((row) => {
      console.log(row);
      res.cookie("refresh_token", "", { expires: new Date(0) });
      res.json({ success: true });
    });
};

exports.create_family_account = function (req, res) {
  const acc_name = req.body["acc_name"];
  return models.family_account
    .create({ family_account_name: acc_name })
    .then(res.json("Family account created!"))
    .catch((err) => res.status(400).json("Error:" + err));
};
