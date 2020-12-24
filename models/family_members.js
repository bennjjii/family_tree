"use strict";

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

    //births

    family_member.hasMany(models.birth, {
      foreignKey: "mother",
    });
    family_member.hasMany(models.birth, {
      foreignKey: "father",
    });
    family_member.hasOne(models.birth, {
      foreignKey: {
        name: "child",
        allowNull: false,
      },
    });

    //deaths

    family_member.hasOne(models.death, {
      foreignKey: {
        name: "died",
        allowNull: false,
      },
    });

    //marriage

    family_member.hasMany(models.marriage, {
      foreignKey: {
        name: "bride",
        allowNull: false,
      },
    });

    family_member.hasMany(models.marriage, {
      foreignKey: {
        name: "groom",
        allowNull: false,
      },
    });
  };

  return family_member;
};
