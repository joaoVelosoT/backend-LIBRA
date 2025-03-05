const { DataTypes } = require("sequelize");
const db = require("../database/config");
const Notification = require("./Notification");
const RequestedBook = require("./RequestedBook");

const Notification_requestedBook = db.define("Notificacoes_livro_solicitado", {
    notificao_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Notification,
            key: "id",
        },
        onDelete: "CASCADE"
    },
    livro_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: RequestedBook,
            key: "id",
        },
        onDelete: "CASCADE"
    }
});

module.exports = Notification_requestedBook;