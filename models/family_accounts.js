"use strict";

module.exports = (sequelize, DataTypes) => {
  var family_account = sequelize.define("family_account", {
    uuid_family_account: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    family_account_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  family_account.associate = (models) => {
    //users

    family_account.belongsTo(models.user, {
      foreignKey: {
        name: "uuid_family_account",
        allowNull: false,
      },
    });

    //family members

    family_account.hasMany(models.family_member, {
      foreignKey: {
        name: "uuid_family_account",
        allowNull: false,
      },
    });

    //births

    family_account.hasMany(models.birth, {
      foreignKey: {
        name: "uuid_family_account",
        allowNull: false,
      },
    });

    //deaths

    family_account.hasMany(models.death, {
      foreignKey: {
        name: "uuid_family_account",
        allowNull: false,
      },
    });

    //marriages

    family_account.hasMany(models.marriage, {
      foreignKey: {
        name: "uuid_family_account",
        allowNull: false,
      },
    });

    //divorces

    family_account.hasMany(models.divorce, {
      foreignKey: {
        name: "uuid_family_account",
        allowNull: false,
      },
    });
  };

  return family_account;
};
