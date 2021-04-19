"use strict";
const { Op } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  var family_member = sequelize.define(
    "family_member",
    {
      uuid_family_member: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      first_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      middle_name: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      last_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      d_o_b: {
        type: DataTypes.DATEONLY,
        allowNull: true,
      },
      d_o_d: {
        type: DataTypes.DATEONLY,
        allowNull: true,
      },

      notes: {
        type: DataTypes.STRING(500),
        allowNull: true,
      },

      gender: {
        type: DataTypes.STRING(10),
        allowNull: false,
      },
      photo: {
        type: DataTypes.UUID,
        allowNull: true,
      },
    },
    {
      indexes: [
        {
          fields: ["uuid_family_member"],
        },
      ],
    }
  );

  //family accounts

  family_member.associate = (models) => {
    family_member.belongsTo(models.family_tree, {
      foreignKey: {
        name: "uuid_family_tree",
        allowNull: false,
      },
    });

    //parents and children

    family_member.belongsTo(models.family_member, {
      as: "fathe",
      foreignKey: {
        name: "father",
        allowNull: true,
      },
    });

    family_member.belongsTo(models.family_member, {
      as: "mothe",
      foreignKey: {
        name: "mother",
        allowNull: true,
      },
    });

    // family_member.hasOne(models.family_member, {
    //   as: "chil",
    //   foreignKey: {
    //     name: "father",
    //     allowNull: true,
    //   },
    // });

    //marriage

    family_member.hasMany(models.marriage, {
      as: "brid",
      foreignKey: {
        name: "bride",
        allowNull: false,
      },
    });

    family_member.hasMany(models.marriage, {
      as: "groo",
      foreignKey: {
        name: "groom",
        allowNull: false,
      },
    });
  };

  return family_member;
};
