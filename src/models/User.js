// models/User.js
const { DataTypes } = require("sequelize");
const db = require("../database/config");

const User = db.define("User", {
  name: {
    type: DataTypes.STRING(30),
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING(100),
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  isDisabled: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
    allowNull: false,
  },
  techAss: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  favoritos: {
    type: DataTypes.JSON,
    defaultValue: [],
    allowNull: false
  },
  validToken: {
    type: DataTypes.STRING, 
    allowNull: true,
  },
  resetPasswordToken: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  resetPasswordExpires: {
    type: DataTypes.DATE,
    allowNull: true,
  }
}, {
  tableName: "Users",
  timestamps: true,
});


User.associate = function(models) {
  User.hasOne(models.UserDisabled, {
    foreignKey: 'idUser',
    as: 'userDisabledInfo'
  });
};

module.exports = User;