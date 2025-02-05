const isEmail = require("../../../utils/isEmail");

const UserUpdateValidator = async (req, res, next) => {
  try {
    const { name, email, password, isDisabled, techAss } = req.body;
    const errors = [];

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

    if (isDisabled) {
      // Fazer outras validações no password
      if (typeof isDisabled !== "boolean") {
        errors.push({
          field: "isDisabled",
          message: "O 'isDisabled' precisa ser um boolean",
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
            validator: "UserUpdateValidator",
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
