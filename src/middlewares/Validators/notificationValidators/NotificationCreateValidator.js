const NotificationCreateValidator = async (req, res, next) => {
  try {
    const { title, description, type } = req.body;
    const errors = [];

    // Validação do título
    if (!title || typeof title !== "string" || title.trim() === "" || title.length > 50) {
      errors.push({
        field: "title",
        message: "O título é obrigatório e deve ter no máximo 50 caracteres.",
      });
    }

    // Validação da descrição
    if (!description || typeof description !== "string" || description.trim() === "" || description.length > 100) {
      errors.push({
        field: "description",
        message: "A descrição é obrigatória e deve ter no máximo 100 caracteres.",
      });
    }

    // Validação do tipo
    if (!type || typeof type !== "string" || type.trim() === "" || type.length > 50) {
      errors.push({
        field: "type",
        message: "O tipo é obrigatório e deve ter no máximo 50 caracteres.",
      });
    }

    // Se houver erros, retorne-os
    if (errors.length > 0) {
      return res.status(400).json({
        code: 400,
        errors,
        message: "Erro ao validar notificação",
        success: false,
      });
    }

    // Adiciona os dados validados ao request
    req.notificationData = { title, description, type };
    return next();
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      code: 500,
      error: {
        details: [
          {
            validator: "NotificationCreateValidator",
            message: "Erro interno",
          },
        ],
      },
      message: "Erro no NotificationCreateValidator",
      success: false,
    });
  }
};

module.exports = NotificationCreateValidator;