const { DataTypes } = require("sequelize");
const db = require("../database/config");

const TypesDisabled = db.define("typesDisabled", {

    name: {
        type: DataTypes.STRING(30),
        allowNull: false,
    },

});

module.exports = TypesDisabled;
