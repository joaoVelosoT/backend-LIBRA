const { DataTypes } = require("sequelize");
const db = require("../database/config");

const Evento = db.define("eventos", {
    titulo: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    categoria: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    descricao: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    data_evento: {
        type: DataTypes.DATE,
        allowNull: false
    },
    banner: {
        type: DataTypes.BLOB,
        allowNull: true
    }
});


module.exports = Evento;