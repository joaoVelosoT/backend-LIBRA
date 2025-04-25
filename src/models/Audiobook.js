// models/AudioBook.js
const { DataTypes } = require("sequelize");
const db = require("../database/config");
const Arquivos = require("./Arquivos");

const AudioBook = db.define("Audiobook", {
  id_arquivo: {
    type: DataTypes.INTEGER,
    references: { model: Arquivos, key: "id" },
    onDelete: "SET NULL",
    allowNull: true
  },
  id_livro: {  
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: 'Books', key: 'id' }
  },
  publicacao: {
    type: DataTypes.DATEONLY,
    allowNull: true
  }
}, {
  tableName: "Audiobooks",
  timestamps: true
});

AudioBook.belongsTo(Arquivos, { foreignKey: 'id_arquivo', as: 'arquivo' });

module.exports = AudioBook;