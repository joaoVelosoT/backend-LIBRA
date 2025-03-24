const { DataTypes } = require("sequelize");
const db = require("../database/config");
const Arquivos = require("./Arquivos");

const EBook = db.define("Ebook", {
  id_arquivo: {
    type: DataTypes.INTEGER,
    references: {
      model: Arquivos,
      key: "id"
    },
    onDelete: "SET NULL",
    allowNull: true
  },
  publicacao: {
    type: DataTypes.DATEONLY,
    allowNull: true
  }
});

EBook.belongsTo(Arquivos, { foreignKey: 'id_arquivo', as: 'arquivo' });

module.exports = EBook;