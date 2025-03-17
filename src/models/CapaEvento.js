const { DataTypes } = require("sequelize");
const db = require("../database/config");
const Arquivos = require("./Arquivos");

const CapaEvento = db.define("CapaEvento", {
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

CapaEvento.belongsTo(Arquivos, { foreignKey: 'id_link', as: 'arquivo' });
module.exports = CapaEvento;