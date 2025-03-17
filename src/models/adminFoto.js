const { DataTypes } = require("sequelize");
const db = require("../database/config");
const Arquivos = require("./Arquivos");

const AdminFoto = db.define("adminFoto", {
    Image: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    id_arquivo: {
        type: DataTypes.INTEGER,
        references: {
            model: Arquivos,
            key: "id"
        },
        onDelete: "SET NULL",
        allowNull: true
    },

});

module.exports = AdminFoto;