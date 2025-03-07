const { DataTypes } = require("sequelize");
const db = require("../database/config");
const Notification = require("./Notification");
const RequestedBook = require("./RequestedBook");

const NotificationRequestedBook = db.define("NotificationRequestedBook", {
    idNotification: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Notification,
            key: "id",
        },
        onDelete: "CASCADE"
    },
    idRequestedBook: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: RequestedBook,
            key: "id",
        },
        onDelete: "CASCADE"
    }
});

module.exports = NotificationRequestedBook;