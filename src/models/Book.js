const { DataTypes } = require("sequelize");
const db = require("../database/config");
const Capa = require("./Capa");
const Banner = require("./Banner");
const EBook = require("./Ebook");
const AudioBook = require("./AudioBook");

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
    references: {
      model: AudioBook,
      key: "id"
    },
    allowNull: true,
    onDelete: "SET NULL"
  },
  id_ebook: {
    type: DataTypes.INTEGER,
    references: {
      model: EBook,
      key: "id"
    },
    allowNull: true,
    onDelete: "SET NULL"
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
  generos: {
    type: DataTypes.JSON,
    allowNull: true,
    defaultValue: []
  },
  notas: {
    type: DataTypes.JSON,
    defaultValue: [],
    allowNull: true
  },
  notaMedia: {
    type: DataTypes.FLOAT,
    defaultValue: 0,
    allowNull: true
  },
  totalAvaliacoes: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
    allowNull: true
  }
}, {
  tableName: "Books",
  timestamps: true,
});

Book.belongsTo(Capa, { foreignKey: 'id_capa', as: 'capa' });
Book.belongsTo(Banner, { foreignKey: 'id_banner', as: 'banner' });
Book.belongsTo(EBook, { foreignKey: 'id_ebook', as: 'ebook' }); 
Book.hasMany(AudioBook, {
  foreignKey: 'id_livro',
  as: 'audiobook' // Mantendo no singular conforme sua preferência
});


module.exports = Book;