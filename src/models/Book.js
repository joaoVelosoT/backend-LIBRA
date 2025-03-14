const { DataTypes } = require("sequelize");
const db = require("../database/config");
const Capa = require("./Capa");
const Banner = require("./Banner");

const Book = db.define("Books", {
  titulo: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  subtitulo: {
    type: DataTypes.STRING(255),
    allowNull: true,
  },
  descricao: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  id_Audiobook: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  id_ebook: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  id_capa: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: Capa,
      key: "id",
    },
    onDelete: "SET NULL",
  },
  autor: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  editora: {
    type: DataTypes.STRING(255),
    allowNull: true,
  },
  edicao: {
    type: DataTypes.STRING(50),
    allowNull: true,
  },
  ISBN13: {
    type: DataTypes.STRING(13),
    allowNull: true,
  },
  ISBN10: {
    type: DataTypes.STRING(10),
    allowNull: true,
  },
  publicacao: {
    type: DataTypes.DATEONLY,
    allowNull: true,
  },
  paginas: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  capitulos: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  id_banner: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: Banner,
      key: "id",
    },
    onDelete: "SET NULL",
  },
}, {
  tableName: "Books",
  timestamps: true,
});

Book.belongsTo(Capa, { foreignKey: 'id_capa', as: 'capa' });
Book.belongsTo(Banner, { foreignKey: 'id_banner', as: 'banner' });

module.exports = Book;