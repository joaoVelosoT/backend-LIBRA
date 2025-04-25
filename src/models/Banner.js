const { DataTypes } = require("sequelize");
const db = require("../database/config");
const Arquivos = require("./Arquivos");

const Banner = db.define("banner", {
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

Banner.belongsTo(Arquivos, { foreignKey: 'id_link', as: 'arquivo' });
module.exports = Banner;