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
    type: DataTypes.TEXT,
    get() {
      const rawValue = this.getDataValue("favoritos");
      return rawValue ? JSON.parse(rawValue) : []
    },
    set(value) {
      this.setDataValue("favoritos", JSON.stringify(value));
    },
    allowNull: false
  },
  lidosIds: {
    type: DataTypes.JSON,
    defaultValue: [],
    allowNull: false
  },
  desejoLeituraIds: {
    type: DataTypes.JSON,
    defaultValue: [],
    allowNull: false
  },
  lidos: {
    type: DataTypes.TEXT,
    get() {
      const rawValue = this.getDataValue("lidos");
      return rawValue ? JSON.parse(rawValue) : []
    },
    set(value) {
      this.setDataValue("lidos", JSON.stringify(value));
    },
    allowNull: false
  },
  desejoLeitura: {
    type: DataTypes.TEXT,
    get() {
      const rawValue = this.getDataValue("desejoLeitura");
      return rawValue ? JSON.parse(rawValue) : []
    },
    set(value) {
      this.setDataValue("desejoLeitura", JSON.stringify(value));
    },
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
  },
  id_perfil_link: {
    type: DataTypes.STRING,
    allowNull: true
  }
}, {
  tableName: "Users",
  timestamps: true,
});


User.associate = function (models) {
  User.hasOne(models.UserDisabled, {
    foreignKey: 'idUser',
    as: 'userDisabledInfo'
  });
};

module.exports = User;