const { DataTypes } = require("sequelize");
const db = require("../database/config");
const Arquivos = require("./Arquivos");

const BannerEvento = db.define("BannerEvento", {
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

BannerEvento.belongsTo(Arquivos, { foreignKey: 'id_link', as: 'arquivo' });
module.exports = BannerEvento;