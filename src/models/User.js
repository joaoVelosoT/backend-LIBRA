const { DataTypes } = require("sequelize");
const db = require("../database/config");

const User = db.define("user", {
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
  resetPasswordToken: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  resetPasswordExpires: {
    type: DataTypes.DATE,
    allowNull: true,
  },  
});

module.exports = User;



/*

const [name, Setname] =useState=();

const dataUser = {
  name : name
  passwod : adasn
}

if(!name){
  alert("erro no nome")
}


  const reponse = await fetch("http://localhost:8080/auth/register", {
  method : POST,
  headers : {"Application-type : json"},
  data : dataUser
  })
*/