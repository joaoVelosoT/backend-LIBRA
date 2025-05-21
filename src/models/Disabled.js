const { DataTypes } = require("sequelize");
const db = require("../database/config");

const Disabled = db.define("Disabled", {
  idDisabledTypes: {
    type: DataTypes.INTEGER,
    references: {
      model: 'TypesDisabled',
      key: 'id'
    },
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING(255),
    allowNull: false,
  }
}, {
  tableName: "Disableds",
  timestamps: false
});

Disabled.associate = function (models) {
  Disabled.belongsTo(models.TypesDisabled, {
    foreignKey: 'idDisabledTypes',
    as: 'typeDisabled'
  });
};

module.exports = Disabled;