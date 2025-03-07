const { DataTypes } = require("sequelize");
const db = require("../database/config");

const RequestedBook = db.define("RequestedBook", {
    title: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    description: {
        type: DataTypes.STRING(150),
        allowNull: false
    },
    gender: {
        type: DataTypes.STRING(20),
        allowNull: false
    }
});

module.exports = RequestedBook;