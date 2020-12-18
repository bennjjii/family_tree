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
    family_member.belongsTo(models.family_account, {
      foreignKey: {
        name: "uuid_family_account",
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
      name: "bride",
      allowNull: false,
    });

    family_member.hasMany(models.marriage, {
      name: "groom",
      allowNull: false,
    });

    //divorce

    family_member.hasMany(models.divorce, {
      name: "female",
      allowNull: false,
    });

    family_member.hasMany(models.divorce, {
      name: "male",
      allowNull: false,
    });
  };

  return family_member;
};
