const { DataTypes } = require("sequelize");
const db = require("../database/config");
const Arquivos = require("./Arquivos");

const GifEvento = db.define("GifEvento", {
  id_link: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Arquivos,
      key: "id",
    },
    onDelete: "CASCADE",
  },
});

GifEvento.belongsTo(Arquivos, { foreignKey: 'id_link', as: 'arquivo' });
module.exports = GifEvento;