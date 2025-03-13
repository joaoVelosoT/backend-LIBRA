const { DataTypes } = require("sequelize");
const db = require("../database/config");
const Arquivos = require("./Arquivos");

const Banner = db.define("banner", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  id_link: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Arquivos, // Referência ao modelo Arquivos
      key: "id",
    },
    onDelete: "CASCADE", // Se o arquivo for deletado, o banner também será
  },
});


Banner.belongsTo(Arquivos, { foreignKey: "id_link", as: "arquivo" });

module.exports = Banner;