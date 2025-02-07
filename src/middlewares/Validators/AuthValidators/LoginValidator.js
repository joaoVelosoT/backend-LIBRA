const isEmail = require("../../../utils/isEmail");

const LoginValidator = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const errors = [];

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

    if (errors.length !== 0) {
      return res.status(400).json({
        code: 400,
        errors,
        message: "Erro ao validar login",
        success: false,
      });
    }

    req.dataLogin = {
      email,
      password,
    };

    return next();
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      code: 500,
      error: {
        details: [
          {
            validator: "LoginValidator",
            message: "Erro interno",
          },
        ],
      },
      message: "Erro no LoginValidator",
      success: false,
    });
  }
};

module.exports = LoginValidator;
