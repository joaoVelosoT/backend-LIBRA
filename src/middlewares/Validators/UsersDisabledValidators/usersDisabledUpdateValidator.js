const Disabled = require("../../../models/Disabled");

const UserDisabledUpdateValidator = async (req, res, next) => {
  try {
    const { idDisabled } = req.body;
    const errors = [];

    if (!idDisabled) {
      errors.push({
        field: "idDisabled",
        message: "O 'idDisabled' é obrigatório",
      });
    } else if (isNaN(idDisabled)) {
      errors.push({
        field: "idDisabled",
        message: "O 'idDisabled' deve ser um número válido",
      });
    } else {
      const disabledExists = await Disabled.findByPk(idDisabled);
      if (!disabledExists) {
        errors.push({
          field: "idDisabled",
          message: "O 'idDisabled' informado não existe",
        });
      }
    }

    if (errors.length !== 0) {
      return res.status(400).json({
        code: 400,
        errors,
        message: "Erro ao validar UserDisabled",
        success: false,
      });
    }

    req.dataUsersDisabled = { idDisabled }; 

    return next();
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      code: 500,
      error: {
        details: [
          {
            validator: "UserDisabledUpdateValidator",
            message: "Erro interno",
          },
        ],
      },
      message: "Erro no UserDisabledUpdateValidator",
      success: false,
    });
  }
};

module.exports = UserDisabledUpdateValidator;
