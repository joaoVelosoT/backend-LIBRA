const { Sequelize } = require("sequelize");
require("dotenv").config();

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: "mysql",
    dialectOptions: {
      options: {
        encrypt: true
      }
    }
  }
);

const DBAuthenticate = async () => {
  try {
    await sequelize.authenticate().then(async () => {
      console.log("==========================================================");
      console.log(`Banco de dados conectado com sucesso`);
      console.log("==========================================================");
      await sequelize.sync();
    });
  } catch (error) {
    console.log("==========================================================");
    console.log(`Erro ao conectar no banco de dados ${error}`);
    console.log("==========================================================");
  }
};

DBAuthenticate();

module.exports = sequelize;
