const expressValidator = require("express-validator");
const isEmail = require("../../../utils/isEmail");

const UserCreateValidator = async (req, res, next) => {
  try {
    const { name, email, password, isDisabled, techAss, idDisabled } = req.body;
    const errors = [];

    if (!name) {
      errors.push({
        field: "name",
        message: "O 'name' e obrigatorio",
      });
    }

    if (!email) {
      errors.push({
        field: "email",
        message: "O 'email' e obrigatorio",
      });
    }

    if (email) {
      // validar se e um email valido
      const emailIsValid = await isEmail(email);
      if (!emailIsValid) {
        errors.push({
          field: "email",
          message: "O 'email' não e valido",
        });
      }
    }

    if (!password) {
      errors.push({
        field: "password",
        message: "O 'password' e obrigatorio",
      });
    }

    // Fazer outras validações no password
    if (typeof isDisabled !== "boolean") {
      errors.push({
        field: "isDisabled",
        message: "O 'isDisabled' e obrigatorio é precisa ser um boolean",
      });
    }

    if (isDisabled) {
      if (!idDisabled) {
        errors.push({
          field: "idDisabled",
          message: "O 'idDisabled' e obrigatorio",
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
            validator: "UserCreateValidator",
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
