// middlewares/Validators/AuthValidators/AdminLoginValidator.js
const AdminLoginValidator = async (req, res, next) => {
  try {
    const { NIF, password } = req.body;
    const errors = [];

    // Validação do NIF
    if (!NIF) {
      errors.push({
        field: "NIF",
        message: "O 'NIF' é obrigatório",
      });
    }

    // Validação da senha
    if (!password) {
      errors.push({
        field: "password",
        message: "O 'password' é obrigatório",
      });
    }

    // Se houver erros, retorne-os
    if (errors.length > 0) {
      return res.status(400).json({
        code: 400,
        errors,
        message: "Erro ao validar login",
        success: false,
      });
    }

    req.dataLogin = {
      NIF,
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
            validator: "AdminLoginValidator",
            message: "Erro interno",
          },
        ],
      },
      message: "Erro no AdminLoginValidator",
      success: false,
    });
  }
};

module.exports = AdminLoginValidator;