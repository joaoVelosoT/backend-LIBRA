const expressValidator = require("express-validator");
const isEmail = require("../../../utils/isEmail");

const UserCreateValidator = async (req, res, next) => {
  try {

    console.log(req.body);


    const { name, email, password, isDisabled, techAss, idDisabled } = req.body;
    const errors = [];

    if (!name) {
      errors.push({
        field: "name",
        message: "O 'name' é obrigatório",
      });
    }

    if (!email) {
      errors.push({
        field: "email",
        message: "O 'email' é obrigatório",
      });
    }

    if (email) {
      const emailIsValid = await isEmail(email);
      if (!emailIsValid) {
        errors.push({
          field: "email",
          message: "O 'email' não é válido",
        });
      }
    }

    if (!password) {
      errors.push({
        field: "password",
        message: "O 'password' é obrigatório",
      });
    }

    if (typeof isDisabled !== "boolean") {
      errors.push({
        field: "isDisabled",
        message: "O 'isDisabled' é obrigatório e precisa ser um boolean",
      });
    }

    if (isDisabled) {
      if (!idDisabled) {
        errors.push({
          field: "idDisabled",
          message: "O 'idDisabled' é obrigatório",
        });
      }
      // techAss pode ser fornecido, mas não é obrigatório
    } else {
      // Se isDisabled for false, techAss não deve ser fornecido
      if (techAss) {
        errors.push({
          field: "techAss",
          message: "O 'techAss' não deve ser fornecido quando 'isDisabled' é false",
        });
      }
    }

    if (errors.length !== 0) {
      return res.status(400).json({
        code: 400,
        errors,
        message: "Erro ao validar user",
        success: false,
      });
    }

    req.user = {
      name,
      email,
      password,
      isDisabled,
      techAss,
      idDisabled,
    };

    return next();
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      code: 500,
      error: {
        details: [
          {
            validator: "User CreateValidator",
            message: "Erro interno",
          },
        ],
      },
      message: "Erro no UserCreateValidator",
      success: false,
    });
  }
};

module.exports = UserCreateValidator;