const UsersDisabledCreateValidator = async (req, res, next) => {
  try {
    const { idUser, idDisabled } = req.body;
    const errors = [];

    if (!idUser) {
      errors.push({
        field: "idUser",
        message: "O 'idUser' e obrigatorio",
      });
    }

    if (!idDisabled) {
      errors.push({
        field: "idDisabled",
        message: "O 'idDisabled' e obrigatorio",
      });
    }

    if (errors.length !== 0) {
      return res.status(400).json({
        code: 400,
        errors,
        message: "Erro ao validar UsersDisabled",
        success: false,
      });
    }

    req.dataUsersDisabled = {
      idUser,
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
            validator: "UsersDisabledCreateValidator",
            message: "Erro interno",
          },
        ],
      },
      message: "Erro no UsersDisabledCreateValidator",
      success: false,
    });
  }
};

module.exports = UsersDisabledCreateValidator;
