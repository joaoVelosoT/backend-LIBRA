const { DataTypes } = require("sequelize");
const db = require("../database/config");

const RequestedBook = db.define("RequestedBook", {
    title: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    author: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    gender: {
        type: DataTypes.STRING(30),
        allowNull: false
    }
});

module.exports = RequestedBook;