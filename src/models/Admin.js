// models/Admin.js
const { DataTypes } = require("sequelize");
const db = require("../database/config");
const AdminFoto = require("./adminFoto")

const Admin = db.define("admin", {
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
  NIF: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  IDimagemPerfil: {
    type: DataTypes.INTEGER,
    references: {
      model: AdminFoto,
      key: "id",
    },
    onDelete: "CASCADE",
    allowNull: true
  },
  resetPasswordToken: {
    
    type: DataTypes.STRING,
    allowNull: true,
  },
  resetPasswordExpires: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  validToken: {
    type: DataTypes.STRING,
    allowNull: true,
  },
});

module.exports = Admin;