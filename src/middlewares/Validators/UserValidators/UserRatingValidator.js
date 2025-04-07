const UserRatingValidator = async (req, res, next) => {
  try {
    const { nota } = req.body;
    const errors = [];

    if (!nota || isNaN(nota)) {
      errors.push({
        field: "nota",
        message: "A 'nota' é obrigatória e deve ser um número",
      });
    } else if (parseFloat(nota) < 1 || parseFloat(nota) > 5) {
      errors.push({
        field: "nota",
        message: "A 'nota' deve ser entre 1 e 5",
      });
    }

    if (errors.length > 0) {
      return res.status(400).json({
        code: 400,
        errors,
        message: "Erro ao validar a avaliação",
        success: false,
      });
    }

    req.ratingData = {
      nota: parseFloat(nota)
    };

    return next();
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      code: 500,
      error: {
        details: [
          {
            validator: "UserRatingValidator",
            message: error.message,
          },
        ],
      },
      message: "Erro no UserRatingValidator",
      success: false,
    });
  }
};

module.exports = UserRatingValidator;