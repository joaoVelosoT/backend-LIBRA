const { DataTypes } = require("sequelize");
const sequelize = require("../database/config");
const TypesDisabled = require("./typesDisabled");

const Disabled = sequelize.define("Disabled", {
  idDisabledTypes: {
    type: DataTypes.INTEGER,
    references: {
      model: TypesDisabled,
      key: "id",
    },
    onDelete: "CASCADE",
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
});

Disabled.associate = function(models) {
  Disabled.belongsTo(models.TypesDisabled, {
    foreignKey: 'idDisabledTypes',
    as: 'typeDisabled'
  });
};

module.exports = Disabled;
