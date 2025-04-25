const { DataTypes } = require("sequelize");
const db = require("../database/config");
const Arquivos = require("./Arquivos");

const AdminFoto = db.define("adminFoto", {
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

AdminFoto.belongsTo(Arquivos, { foreignKey: "id_link", as: "arquivo" });


module.exports = AdminFoto;