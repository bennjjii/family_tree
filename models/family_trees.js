"use strict";

module.exports = (sequelize, DataTypes) => {
  let family_tree = sequelize.define("family_tree", {
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
    focal_member: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    isPublic: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false,
    },
    publicName: {
      type: DataTypes.STRING,
      allowNull: true,
      unique: true,
    },
  });

  family_tree.associate = (models) => {
    //users

    family_tree.belongsTo(models.user, {
      as: "use",
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
