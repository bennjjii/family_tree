"use strict";

module.exports = (sequelize, DataTypes) => {
  var death = sequelize.define("death", {
    uuid_death: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    d_o_d: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
  });

  death.associate = (models) => {
    death.belongsTo(models.family_member, {
      foreignKey: {
        name: "died",
        allowNull: false,
      },
    });
    death.belongsTo(models.family_tree, {
      foreignKey: {
        name: "uuid_family_tree",
        allowNull: false,
      },
    });
  };

  return death;
};
