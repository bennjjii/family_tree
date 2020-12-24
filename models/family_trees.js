"use strict";

module.exports = (sequelize, DataTypes) => {
  var family_tree = sequelize.define("family_tree", {
    uuid_family_tree: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    family_tree_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  family_tree.associate = (models) => {
    //users

    family_tree.belongsTo(models.user, {
      foreignKey: {
        name: "uuid_user",
        allowNull: false,
      },
    });

    //family members

    family_tree.hasMany(models.family_member, {
      foreignKey: {
        name: "uuid_family_tree",
        allowNull: false,
      },
    });

    //births

    family_tree.hasMany(models.birth, {
      foreignKey: {
        name: "uuid_family_tree",
        allowNull: false,
      },
    });

    //deaths

    family_tree.hasMany(models.death, {
      foreignKey: {
        name: "uuid_family_tree",
        allowNull: false,
      },
    });

    //marriages

    family_tree.hasMany(models.marriage, {
      foreignKey: {
        name: "uuid_family_tree",
        allowNull: false,
      },
    });
  };

  return family_tree;
};
