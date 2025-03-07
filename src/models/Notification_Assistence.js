const { DataTypes } = require("sequelize");
const db = require("../database/config");
const Notification = require("./Notification");
const User = require("./User");
const Evento = require("./Evento");

const NotificationAssistence = db.define("NotificationAssistence", {
    notificao_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Notification,
            key: "id",
        },
        onDelete: "CASCADE"
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: User,
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

module.exports = NotificationAssistence;