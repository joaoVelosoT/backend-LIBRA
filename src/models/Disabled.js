const { DataTypes } = require("sequelize");
const sequelize = require("../database/config");

const Disabled = sequelize.define("Disabled", {
  id_disabled_types: {
    type: DataTypes.INTEGER,
      //   references: {
  //     model: DisabledsTypes,
  //     key: 'id',
  // },
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
});

module.exports = Disabled;