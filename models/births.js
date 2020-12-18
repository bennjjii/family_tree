"use strict";

module.exports = (sequelize, DataTypes) => {
  var birth = sequelize.define("birth", {
    uuid_birth: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    d_o_b: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
  });

  birth.associate = (models) => {
    birth.belongsTo(models.family_member, {
      foreignKey: "mother",
    });
    birth.belongsTo(models.family_member, {
      foreignKey: "father",
    });
    birth.belongsTo(models.family_member, {
      foreignKey: {
        name: "child",
        allowNull: false,
      },
    });
    birth.belongsTo(models.family_account, {
      foreignKey: {
        name: "uuid_family_account",
        allowNull: false,
      },
    });
  };

  return birth;
};
