const models = require("../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const uuid = require("uuid");
require("dotenv").config();

exports.register = async (req, res) => {
  const hashedPassword = await bcrypt.hash(req.body.password, 10);
  const tempFamilyTreeUuid = uuid.v4();
  const tempFamilyMemberUuid = uuid.v4();
  try {
    const createdUser = await models.family_tree.create(
      {
        uuid_family_tree: tempFamilyTreeUuid,
        family_tree_name: req.body.family_tree_name,
        focal_member: tempFamilyMemberUuid,
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
    const createdFamilyMember = await models.family_member.create({
      d_o_b: req.body.d_o_b,
      first_name: req.body.first_name,
      middle_name: req.body.middle_name,
      last_name: req.body.last_name,
      gender: req.body.gender,
      uuid_family_member: tempFamilyMemberUuid,
      uuid_family_tree: tempFamilyTreeUuid,
    });

    //console.log(createdUser);
    //console.log(createdFamilyMember);
    res.json(createdUser);
  } catch (err) {
    console.log(err.errors);
    if (err.name === "SequelizeUniqueConstraintError") {
      res.status(403).json(err.errors);
    } else {
      res.sendStatus(404);
    }
  }
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

      const {
        dataValues: { uuid_family_tree, focal_member },
      } = await models.family_tree.findOne({
        where: {
          uuid_user: uuid_user,
        },
      });

      if (req.cookies.refresh_token === user.refresh_token) {
        const userObj = {
          uuid_user: user.uuid_user,
          username: user.username,
          uuid_family_tree: uuid_family_tree,
          focal_member: focal_member,
        };
        const accessToken = jwt.sign(userObj, process.env.ACCESS_TOKEN_SECRET, {
          //reset to 15m
          expiresIn: "15m",
        });
        console.log("New access token granted" + accessToken);
        res.json(accessToken);
      } else {
        res.sendStatus(401);
      }
    }
  } catch (err) {
    console.log(err);
    res.sendStatus(401);
  }
};

exports.login = async (req, res) => {
  let user = undefined;
  try {
    user = await models.user.findOne({
      where: {
        username: req.body.username,
      },
      raw: true,
    });
    if (!user) {
      throw new Error("USER_NOT_FOUND");
    }
    if (await bcrypt.compare(req.body.password, user.hashed_password)) {
      const userObj = { uuid_user: user.uuid_user, username: user.username };
      //this will silently fail if no refresh token secret is set
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
      console.log(updatedUser);
      res.cookie("refresh_token", refreshToken, {
        httpOnly: true,
        sameSite: "strict",
        //add path restriction
      });
      res.json({ auth: true });
    } else {
      console.log("Not Allowed");
      throw new Error("INCORRECT_PASSWORD");
    }
  } catch (err) {
    switch (err.message) {
      case "USER_NOT_FOUND":
        res.sendStatus(409);
        break;
      case "INCORRECT_PASSWORD":
        res.sendStatus(401);
        break;
    }
  }
};

exports.logout = async (req, res) => {
  await models.user
    .update(
      {
        refresh_token: null,
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
