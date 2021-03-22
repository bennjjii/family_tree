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

exports.refreshAccessToken = async (req, res) => {
  try {
    const { uuid_user } = await jwt.verify(
      req.cookies.refresh_token,
      process.env.REFRESH_TOKEN_SECRET
    );
    console.log(uuid_user);
    if (uuid_user) {
      models.user
        .findOne({
          where: {
            uuid_user: uuid_user,
          },
        })
        .then((res) => {
          if (req.cookies.refresh_token === res.refresh_token) {
            console.log("access token granted");
            return res.sendStatus(200);
          }
        });
    }
  } catch (err) {
    console.log(err);
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
      const accessToken = jwt.sign(userObj, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: 300,
      });
      const refreshToken = jwt.sign(userObj, process.env.REFRESH_TOKEN_SECRET, {
        expiresIn: 30000,
      });
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
      });
      res.json({ auth: true, accessToken: accessToken });
    } else {
      console.log("Not Allowed");
    }
  } catch {
    res.status(500).send();
  }
};

exports.create_family_account = function (req, res) {
  const acc_name = req.body["acc_name"];
  return models.family_account
    .create({ family_account_name: acc_name })
    .then(res.json("Family account created!"))
    .catch((err) => res.status(400).json("Error:" + err));
};
