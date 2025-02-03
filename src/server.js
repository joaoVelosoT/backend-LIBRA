require("dotenv").config();
const express = require("express");
const app = express();
const PORT = process.env.PORT || 8080;
const router = require("./routers/router");
const sequelize = require("./database/config");
app.use(express.json());
app.use(router);

// Validar .env
if (
  !process.env.DB_HOST || 
  !process.env.DB_NAME || 
  !process.env.DB_USER || 
  !process.env.DB_PASSWORD
) {
  console.error('Erro: As seguintes variáveis de ambiente são necessárias:');
  console.error(' - DB_HOST');
  console.error(' - DB_NAME');
  console.error(' - DB_USER');
  console.error(' - DB_PASSWORD');
  process.exit(1); // Encerra o programa com código de erro
}



try {
  // sequelize();
  app.listen(PORT, () => {
    console.log("==========================================================");
    console.log(`Servidor rodando na porta ${PORT}`);
    console.log("==========================================================");
  });
} catch (error) {
  console.log(error);
}
