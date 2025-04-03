const ValidatorID = async (req, res, next) => {
  try {
    const { id, userId, bookId } = req.params;
    const errors = [];

    const checkId = (value, name) => {
      if (!value) {
        errors.push({
          field: name,
          message: `O ${name} é obrigatório`,
        });
      } else if (!Number(value)) {
        errors.push({
          field: name,
          message: `O ${name} deve ser um número válido`,
        });
      } else if (Number(value) <= 0) {
        errors.push({
          field: name,
          message: `O ${name} não pode ser negativo ou zero`,
        });
      }
    };

    if (id) checkId(id, 'id');
    if (userId) checkId(userId, 'userId');
    if (bookId) checkId(bookId, 'bookId');

    if (errors.length > 0) {
      return res.status(400).json({
        code: 400,
        errors,
        message: "Erro ao validar ID(s)",
        success: false,
      });
    }

    return next();
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      code: 500,
      error: {
        details: [
          {
            validator: "ValidatorID",
            message: error.message,
          },
        ],
      },
      message: "Erro no ValidatorID",
      success: false,
    });
  }
};

module.exports = ValidatorID;