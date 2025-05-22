const { DataTypes } = require("sequelize");
const db = require("../database/config");
const Arquivos = require("./Arquivos");

const Braille = db.define("Braille", {
    id_link: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Arquivos,
            key: "id",
        },
        onDelete: "CASCADE",
    },
});

Braille.belongsTo(Arquivos, { foreignKey: 'id_link', as: 'arquivo' });

module.exports = Braille;