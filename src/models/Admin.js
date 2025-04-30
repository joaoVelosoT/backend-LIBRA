const { DataTypes } = require("sequelize");
const db = require("../database/config");
const AdminFoto = require("./adminFoto");

// Criação do modelo Admin -> tabela Admin no Banco de Dados
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
  id_AdminFoto: {
    type: DataTypes.INTEGER,
    references: {
      model: AdminFoto,
      key: "id",
    },
    onDelete: "SET NULL", 
    allowNull: true,
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

// Declarando a relação da tabela Admin com Admin foto através da chave estrangeira

Admin.belongsTo(AdminFoto, { foreignKey: "id_AdminFoto", as: "foto" });

module.exports = Admin;