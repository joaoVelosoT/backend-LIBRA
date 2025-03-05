const { DataTypes } = require("sequelize");
const db = require("../database/config");
const Notification = require("./Notification");
const UserDisabled = require("./UsersDisableds");
const Evento = require("./Evento");

const Notification_event = db.define("Notificacoes_evento", {
    notificao_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Notification,
            key: "id",
        },
        onDelete: "CASCADE"
    },
    user_disabled_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: UserDisabled,
            key: "id",
        },
        onDelete: "CASCADE"
    },
    evento_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Evento,
            key: "id",
        },
        onDelete: "CASCADE"
    }
});

module.exports = Notification_event;