const { DataTypes } = require("sequelize");
const db = require("../database/config");

const User = db.define("user", {
  name: {
    type: DataTypes.STRING(30),
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING(100),
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  isDisabled: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
    allowNull: false,
  },
  techAss: {
    type: DataTypes.STRING,
    allowNull: true,
  },
});

module.exports = User;
