const { DataTypes } = require("sequelize");
const db = require("../database/config");
const Arquivos = require("./Arquivos");

// Criação do modelo AdminFoto que salva o link das fotos de adm no Cloud Storage
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

// Declaração do relacioonamento entre as tabelas adminFoto e Arquivos
AdminFoto.belongsTo(Arquivos, { foreignKey: "id_link", as: "arquivo" });


module.exports = AdminFoto;