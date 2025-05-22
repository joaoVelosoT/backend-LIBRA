const { DataTypes } = require("sequelize");
const db = require("../database/config");
const Arquivos = require("./Arquivos");

const Epub = db.define("Epub", {
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

Epub.belongsTo(Arquivos, { foreignKey: 'id_link', as: 'arquivo' });

module.exports = Epub;