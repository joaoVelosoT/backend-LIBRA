const ValidatorID = async (req, res, next) => {
  try {
    const errors = [];

    if (!req.params.id) {
      errors.push({
        field: "id",
        message: "O id e obrigatorio",
      });
    }

    if (req.params.id) {
      if (typeof Number(req.params.id) !== "number") {
        console.log(Number(req.params.id));

        errors.push({
          field: "id",
          message: "O id enviado não e um numero",
        });
      }
      if (req.params.id <= 0) {
        errors.push({
          field: "id",
          message: "O id e não pode ser negativo, ou igual a 0",
        });
      }

      if (errors.length !== 0) {
        return res.status(400).json({
          code: 400,
          errors,
          message: "Erro ao validar id",
          success: false,
        });
      }

      return next();
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      code: 500,
      error: {
        details: [
          {
            validator: "ValidatorID",
            message: "Erro interno",
          },
        ],
      },
      message: "Erro no ValidatorID",
      success: false,
    });
  }
};

module.exports = ValidatorID;
