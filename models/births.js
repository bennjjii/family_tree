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
      allowNull: true,
    },
  });

  birth.associate = (models) => {
    birth.belongsTo(models.family_member, {
      as: "mothe",
      foreignKey: "mother",
    });
    birth.belongsTo(models.family_member, {
      as: "fathe",
      foreignKey: "father",
    });
    birth.belongsTo(models.family_member, {
      as: "chil",
      foreignKey: {
        name: "child",
        allowNull: false,
      },
    });
    birth.belongsTo(models.family_tree, {
      as: "birt",
      foreignKey: {
        name: "uuid_family_tree",
        allowNull: false,
      },
    });
  };

  return birth;
};
