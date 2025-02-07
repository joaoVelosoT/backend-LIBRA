const { DataTypes } = require("sequelize");
const sequelize = require("../database/config");
const TypesDisabled = require("./typesDisabled");

const Disabled = sequelize.define("Disabled", {
  id_disabled_types: {
    type: DataTypes.INTEGER,
    references: {
      model: TypesDisabled,
      key: "id",
    },
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
});

module.exports = Disabled;
