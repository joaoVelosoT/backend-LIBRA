const { DataTypes } = require("sequelize");
const db = require("../database/config");
const Arquivos = require("./Arquivos");

const AudioBook = db.define("Audiobook", {
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

AudioBook.belongsTo(Arquivos, { foreignKey: 'id_arquivo', as: 'arquivo' });

module.exports = AudioBook;