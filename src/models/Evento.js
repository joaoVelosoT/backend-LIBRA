const { DataTypes } = require("sequelize");
const db = require("../database/config");

const CapaEvento = require("../models/CapaEvento");
const GifEvento = require("./GifEvento");

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
        type: DataTypes.STRING(500),
        allowNull: false
    },
    data_evento: {
        type: DataTypes.DATE,
        allowNull: false
    },
    id_capa: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: CapaEvento,
            key: "id",
        },
        onDelete: "SET NULL",
    },
    id_Gif: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: GifEvento,
            key: "id",
        },
        onDelete: "SET NULL",
    }
});

Evento.belongsTo(CapaEvento, { foreignKey: "id_capa", as: "capa" });
Evento.belongsTo(GifEvento, { foreignKey: "id_Gif", as: "gif" });


module.exports = Evento;