//Função que valida os IDs das tabelas

//Controllador do Serviço
const ValidatorID = async (req, res, next) => {
  try {
    const { id, userId, bookId } = req.params;

    var errors = []

    if (id) errors = checkId(id, 'id');
    if (userId) errors = checkId(userId, 'userId');
    if (bookId) errors = checkId(bookId, 'bookId');

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

// Service do Serviço
const checkId = (value, name) => {
  const errors = [];

  // Verifica se o valor existe
  if (!value) {
    errors.push({
      field: name,
      message: `O ${name} é obrigatório`,
    });

    // Verifica se o valor é um número (tipo esperado por um ID)
  } else if (!Number(value)) {
    errors.push({
      field: name,
      message: `O ${name} deve ser um número válido`,
    });

    // Verifica se o valor é negativo 
  } else if (Number(value) <= 0) {
    errors.push({
      field: name,
      message: `O ${name} não pode ser negativo ou zero`,
    });
  }

  return errors
};

module.exports = ValidatorID;