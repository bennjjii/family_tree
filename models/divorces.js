"use strict";

module.exports = (sequelize, DataTypes) => {
  var divorce = sequelize.define("divorce", {
    uuid_divorce: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    d_o_div: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
  });

  divorce.associate = (models) => {
    //female family member, bride

    divorce.belongsTo(models.family_member, {
      foreignKey: {
        name: "female",
        allowNull: false,
      },
    });

    //female family member, groom

    divorce.belongsTo(models.family_member, {
      foreignKey: {
        name: "male",
        allowNull: false,
      },
    });

    //family account

    divorce.belongsTo(models.family_account, {
      foreignKey: {
        name: "uuid_family_account",
        allowNull: false,
      },
    });
  };

  return divorce;
};
