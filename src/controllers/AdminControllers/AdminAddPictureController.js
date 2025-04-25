const AdminAddPictureService = require("../../services/AdminServices/AdminAddPictureService");

const AdminAddPictureController = async (req, res) => {
  try {
    const { id } = req.params; // ID do admin
    const imagemPerfil = req.file; // Arquivo enviado (processado pelo Multer)

    if (!imagemPerfil) {
      return res.status(400).json({
        code: 400,
        error: {
          details: [
            {
              field: "imagemPerfil",
              message: "A imagem de perfil é obrigatória.",
            },
          ],
        },
        message: "Erro ao atualizar a foto de perfil",
        success: false,
      });
    }

    // Chama o service para atualizar a foto
    const result = await AdminAddPictureService(id, imagemPerfil);

    if (result.success) {
      return res.status(result.code).json({
        code: result.code,
        message: result.message,
        success: true,
      });
    } else {
      return res.status(result.code).json(result);
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      code: 500,
      error: {
        details: [
          {
            controller: "AdminAddPictureController",
            message: "Erro interno",
          },
        ],
      },
      message: "Erro no AdminAddPictureController",
      success: false,
    });
  }
};

module.exports = AdminAddPictureController;