"use strict";

module.exports = (sequelize, DataTypes) => {
  var user = sequelize.define(
    "user",
    {
      uuid_user: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        //unique: true,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        //unique: true,
      },
      hashed_password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      super_user: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
    },
    {
      indexes: [
        { unique: true, fields: ["username"] },
        { unique: true, fields: ["email"] },
      ],
    }
  );

  user.associate = (models) => {
    user.hasMany(models.family_account, {
      foreignKey: {
        name: "uuid_family_account",
        allowNull: false,
      },
    });
  };

  return user;
};
