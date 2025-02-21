require("dotenv").config();
const express = require("express");
const app = express();
const fileUpload = require("express-fileupload");
const PORT = process.env.PORT || 8080;
const router = require("./routers/router");
const valENV = require("./utils/valENV");
const swaggerUI = require("swagger-ui-express");
const swaggerDocs = require("../swagger.json");
const cors = require("cors");
app.use(fileUpload());
app.use(express.json());
app.use(cors());
app.use("/docs", swaggerUI.serve, swaggerUI.setup(swaggerDocs));
app.use(router);

// Validar .env

const funcValidENV = async () => {
  const variableIsValid = await valENV();

  if (variableIsValid) {
    console.log(variableIsValid);
    process.exit(1);
  }
};

funcValidENV();

try {
  app.listen(PORT, () => {
    console.log("==========================================================");
    console.log(`Servidor rodando na porta ${PORT}`);
    console.log("==========================================================");
  });
} catch (error) {
  console.log(error);
}
