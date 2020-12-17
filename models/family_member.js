"use strict"

module.exports = (sequelize, DataTypes) => {
    var family_member = sequelize.define("family_member", {
        uuid_family_member: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            primaryKey: true,
        },
        first_name:{
            type: DataTypes.STRING,
            allowNull: false,
        },
        middle_name:{
            type: DataTypes.STRING,
            allowNull: true,
        },
        last_name:{
            type: DataTypes.STRING,
            allowNull: false,
        },
        photo:{
            type: DataTypes.STRING(200),
            allowNull: true,
        },
        notes:{
            type: DataTypes.STRING(500),
            allowNull: true,
        },
        uuid_family_account: {
            type: DataTypes.UUID,
            allowNull: false,
        },
        gender: {
            type: DataTypes.STRING(10),
            allowNull: false,
        },
    });

    return family_member;
}