const { DataTypes } = require("sequelize");
const db = require("../database/config");

const TypesDisabled = db.define("TypesDisabled", {
  name: {
    type: DataTypes.STRING(30),
    allowNull: false,
  },
}, {
  tableName: "TypesDisabled",
});

TypesDisabled.associate = function (models) {
  TypesDisabled.hasMany(models.Disabled, {
    foreignKey: 'idDisabledTypes',
    as: 'disableds'
  });
};
module.exports = TypesDisabled;
