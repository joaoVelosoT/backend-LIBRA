const { DataTypes } = require("sequelize");
const db = require("../database/config");

const UserDisabled = db.define("UserDisabled", {
  idUser: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Users',
      key: 'id'
    }
  },
  idDisabled: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Disableds',
      key: 'id'
    }
  }
}, {
  tableName: "UsersDisableds",
  timestamps: false
});

UserDisabled.associate = function(models) {
  UserDisabled.belongsTo(models.Disabled, {
    foreignKey: 'idDisabled',
    as: 'disabled' 
  });
};

module.exports = UserDisabled;