const DisabledCreateValidator = async (req, res, next) => {
  try {
    const { idDisabledTypes, name } = req.body;
    const errors = [];

    if (!idDisabledTypes || typeof idDisabledTypes !== "number") {
      errors.push({ 
        field: "idDisabledTypes", 
        message: "O 'idDisabledTypes' não é valido." 
      });
    }

    if (
      !name ||
      typeof name !== "string" ||
      name.trim() === "" ||
      name.length >= 100
    ) {
      errors.push({
        field: "name",
        message: "O nome é obrigatório e não deve passar de 100 caracteres.",
      });
    }

    if (errors.length !== 0) {
      return res.status(400).json({
        code: 400,
        errors,
        message: "Erro ao validar deficiência",
        success: false,
      });
    }

    req.disabledData = { idDisabledTypes, name };
    return next();
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      code: 500,
      error: {
        details: [
          {
            validator: "DisabledCreateValidator",
            message: "Erro interno",
          },
        ],
      },
      message: "Erro no DisabledCreateValidator",
      success: false,
    });
  }
};

module.exports = DisabledCreateValidator;
