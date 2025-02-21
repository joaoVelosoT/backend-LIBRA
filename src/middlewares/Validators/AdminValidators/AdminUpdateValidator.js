const isEmail = require("../../../utils/isEmail");
const Admin = require("../../../models/Admin");

const AdminUpdateValidator = async (req, res, next) => {
  try {
    const { email } = req.body;
    const errors = [];

    // Validar se o email foi fornecido
    if (!email) {
      errors.push({
        field: "email",
        message: "O campo 'email' é obrigatório",
      });
    }

    // Validar se o email é válido
    if (email) {
      const emailIsValid = await isEmail(email);
      if (!emailIsValid) {
        errors.push({
          field: "email",
          message: "O 'email' não é válido",
        });
      }
    }

    // Verificar se o email já existe no banco de dados
    if (email) {
      const existsEmail = await Admin.findOne({
        where: { email },
      });

      if (existsEmail) {
        errors.push({
          field: "email",
          message: "O email enviado já existe",
        });
      }
    }

    // Se houver erros, retornar a resposta de erro
    if (errors.length !== 0) {
      return res.status(400).json({
        code: 400,
        errors,
        message: "Erro ao validar admin",
        success: false,
      });
    }

    req.dataUpdate = { email };

    return next();
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      code: 500,
      error: {
        details: [
          {
            validator: "AdminUpdateValidator",
            message: "Erro interno",
          },
        ],
      },
      message: "Erro no AdminUpdateValidator",
      success: false,
    });
  }
};

module.exports = AdminUpdateValidator;