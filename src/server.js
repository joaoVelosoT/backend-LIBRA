require("dotenv").config();
const express = require("express");
const app = express();
const PORT = process.env.PORT || 8080;
const router = require("./routers/router");
const valENV = require("./utils/valENV");
app.use(express.json());
app.use(router);

// Validar .env
const variableIsValid = valENV();
if (variableIsValid) {
  console.log(variableIsValid);
  process.exit(1);
}

try {
  app.listen(PORT, () => {
    console.log("==========================================================");
    console.log(`Servidor rodando na porta ${PORT}`);
    console.log("==========================================================");
  });
} catch (error) {
  console.log(error);
}