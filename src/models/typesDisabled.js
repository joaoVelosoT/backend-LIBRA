const { DataTypes } = require("sequelize");
const db = require("../database/config");

const TypesDisabled = db.define("typesDisabled", {
    name: {
        type: DataTypes.STRING(30),
        allowNull: false,
    },
});

TypesDisabled.associate = function(models) {
    TypesDisabled.hasMany(models.Disabled, {
      foreignKey: 'idDisabledTypes',
      as: 'disableds'
    });
  };
module.exports = TypesDisabled;
