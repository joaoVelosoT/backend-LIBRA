const { DataTypes } = require("sequelize");
const db = require("../database/config");

const Disabled = db.define("disabled", {
  name: {
    type: DataTypes.STRING(30),
    allowNull: false,
  },
});

module.exports = Disabled;
