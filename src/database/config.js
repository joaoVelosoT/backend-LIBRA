require("dotenv").config();
const { Sequelize } = require("sequelize");

const config = require("../database/databaseConfig")[process.env.NODE_ENV || 'develop'];

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
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
