require("dotenv").config();
const express = require("express");
const app = express();
const PORT = process.env.PORT || 8080;
const router = require("./routers/router");
const valENV = require("./utils/valENV");
const swaggerUI = require("swagger-ui-express");
const swaggerDocs = require("../swagger.json");
const cors = require("cors");
const sequelize = require("./database/config");

const User = require("./models/User");
const UserDisabled = require("./models/UsersDisableds");
const Disabled = require("./models/Disabled");
const TypesDisabled = require("./models/typesDisabled");

User.associate({ UserDisabled, Disabled, TypesDisabled });
UserDisabled.associate({ User, Disabled });
Disabled.associate({ TypesDisabled });
TypesDisabled.associate({ Disabled });

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use("/docs", swaggerUI.serve, swaggerUI.setup(swaggerDocs));
app.use(router);

const funcValidENV = async () => {
  const variableIsValid = await valENV();
  if (variableIsValid) {
    console.log(variableIsValid);
    process.exit(1);
  }
};

funcValidENV();

sequelize.authenticate()
  .then(() => {
    console.log("Conexão com o banco estabelecida");
    console.log("Associações do User:", Object.keys(User.associations));
  })
  .catch(error => {
    console.error("Erro na conexão:", error);
  });

app.listen(PORT, () => {
  console.log("==========================================");
  console.log(`Servidor rodando na porta ${PORT}`);
  console.log("==========================================");
});