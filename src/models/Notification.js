const { DataTypes } = require("sequelize");
const db = require("../database/config");

const Notification = db.define("title", {
  title: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  type: {
    type: DataTypes.STRING(50),
    allowNull: false,
  }
});

module.exports = Notification;