const isEmail = require("../../../utils/isEmail");

const AdminCreateValidator = async (req, res, next) => {
  try {
    const { name, email, password } = req.body; 
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
    } else {
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
    if (errors.length > 0) {
      return res.status(400).json({
        code: 400,
        errors,
        message: "Erro ao validar admin",
        success: false,
      });
    }
    req.adminData = {
      name,
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
            validator: "AdminCreateValidator",
            message: "Erro interno",
          },
        ],
      },
      message: "Erro no AdminCreateValidator",
      success: false,
    });
  }
};

module.exports = AdminCreateValidator;