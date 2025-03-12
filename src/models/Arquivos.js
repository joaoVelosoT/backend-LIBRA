const { DataTypes } = require("sequelize");
const db = require("../database/config");

const Arquivos = db.define("arquivos", {
    nome: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    url: {
        type: DataTypes.STRING,
        allowNull: false
    },
    tipo: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
});

module.exports = Arquivos;