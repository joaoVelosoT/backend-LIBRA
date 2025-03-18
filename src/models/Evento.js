const { DataTypes } = require("sequelize");
const db = require("../database/config");

const Banner = require("../models/Banner");

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
    id_banner: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: Banner,
            key: "id",
        },
        onDelete: "SET NULL",
    }
});


module.exports = Evento;