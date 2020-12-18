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
    family_account.hasMany(models.family_member, {
      foreignKey: {
        name: "uuid_family_account",
        allowNull: false,
      },
    });
  };

  return family_account;
};
