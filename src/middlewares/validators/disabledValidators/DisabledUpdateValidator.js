const isNumber = require("../../../utils/isNumber");

const DisabledUpdateValidator = async (req, res, next) => {
  try {
    const { idDisabledTypes, name } = req.body;
    const errors = [];

    if (idDisabledTypes !== undefined && !isNumber(idDisabledTypes)) {
      errors.push({
        field: "idDisabledTypes",
        message: "O idDisabledTypes deve ser um número válido.",
      });
    }

    if (name !== undefined && (typeof name !== "string" || name.trim() === "" || name.length > 100)) {
      errors.push({
        field: "name",
        message: "O nome não pode estar vazio e deve ter no máximo 100 caracteres.",
      });
    }

    if (errors.length > 0) {
      return res.status(400).json({
        code: 400,
        errors,
        message: "Erro ao validar deficiência",
        success: false,
      });
    }

    req.disabledData = { idDisabledTypes, name };
    next();
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      code: 500,
      error: {
        details: [
          {
            validator: "DisabledUpdateValidator",
            message: "Erro interno",
          },
        ],
      },
      message: "Erro no DisabledUpdateValidator",
      success: false,
    });
  }
};

module.exports = DisabledUpdateValidator;
