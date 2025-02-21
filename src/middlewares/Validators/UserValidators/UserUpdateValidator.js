const isEmail = require("../../../utils/isEmail");

const UserUpdateValidator = async (req, res, next) => {
  try {
    const { name, email, password, isDisabled, techAss } = req.body;
    const errors = [];

    if (email) {
      const emailIsValid = await isEmail(email);
      if (!emailIsValid) {
        errors.push({
          field: "email",
          message: "O 'email' não é válido",
        });
      }
    }

    if (isDisabled !== undefined) {
      if (typeof isDisabled !== "boolean") {
        errors.push({
          field: "isDisabled",
          message: "O 'isDisabled' precisa ser um boolean",
        });
      }
      if (isDisabled && techAss === undefined) {
        errors.push({
          field: "techAss",
          message: "O 'techAss' pode ser fornecido quando 'isDisabled' é true, mas não é obrigatório",
        });
      }
      if (!isDisabled && techAss) {
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

    req.dataUpdate = {
      name,
      email,
      password,
      isDisabled,
      techAss,
    };

    return next();
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      code: 500,
      error: {
        details: [
          {
            validator: "User UpdateValidator",
            message: "Erro interno",
          },
        ],
      },
      message: "Erro no UserUpdateValidator",
      success: false,
    });
  }
};

module.exports = UserUpdateValidator;