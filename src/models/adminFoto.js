const { DataTypes } = require("sequelize");
const db = require("../database/config");

const AdminFoto = db.define("adminFoto", {
    Image: {
        type: DataTypes.BLOB,
        allowNull: true
    }
});

module.exports = AdminFoto;