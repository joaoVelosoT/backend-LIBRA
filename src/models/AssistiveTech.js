const { DataTypes } = require("sequelize");
const db = require("../database/config");

const AssistiveTech = db.define("assistiveTech", {
  name: {
    type: DataTypes.STRING(30),
    allowNull: false,
  },
});

module.exports = AssistiveTech;
