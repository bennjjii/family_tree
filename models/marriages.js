"use strict";

module.exports = (sequelize, DataTypes) => {
  var marriage = sequelize.define("marriage", {
    uuid_marriage: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    d_o_mar: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    d_o_div: {
      type: DataTypes.DATEONLY,
      allowNull: true,
    },
    place: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  });

  marriage.associate = (models) => {
    //female family member, bride

    marriage.belongsTo(models.family_member, {
      as: "brid",
      foreignKey: {
        name: "bride",
        allowNull: false,
      },
    });

    //female family member, groom

    marriage.belongsTo(models.family_member, {
      as: "groo",
      foreignKey: {
        name: "groom",
        allowNull: false,
      },
    });

    //family account

    marriage.belongsTo(models.family_tree, {
      foreignKey: {
        name: "uuid_family_tree",
        allowNull: false,
      },
    });
  };

  return marriage;
};
