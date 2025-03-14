const { DataTypes } = require("sequelize");
const db = require("../database/config");
const Arquivos = require("./Arquivos");

const Capa = db.define("capa", {
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

Capa.belongsTo(Arquivos, { foreignKey: 'id_link', as: 'arquivo' });

module.exports = Capa;