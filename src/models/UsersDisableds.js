const { DataTypes } = require("sequelize");
const db = require("../database/config");
const User = require("./User");
const Disabled = require("./Disabled");

const UserDisabled = db.define("userdisabled", {
  idUser: {
    type: DataTypes.INTEGER,
    references: {
      model: User,
      key: "id",
    },
    allowNull: false,
    onDelete: "CASCADE",
  },
  idDisabled: {
    type: DataTypes.INTEGER,
    references: {
      model: Disabled,
      key: "id",
    },
    onDelete: "CASCADE",
    allowNull: false,
  },
});

module.exports = UserDisabled;
