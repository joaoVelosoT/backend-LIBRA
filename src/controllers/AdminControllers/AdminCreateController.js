const AdminCreateService = require("../../services/AdminServices/AdminCreateService");

const AdminCreateController = async (req, res) => {
  try {
    const adminData = req.adminData; // Dados validados
    const imagemPerfil = req.file; // Arquivo processado

    const admin = await AdminCreateService(adminData, { imagemPerfil });

    if (!admin.success) {
      return res.status(admin.code).json(admin);
    }

    return res.status(admin.code).json({
      code: admin.code,
      data: admin.admin,
      message: admin.message,
      success: true,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      code: 500,
      error: {
        details: [
          {
            controller: "AdminCreateController",
            message: "Erro interno",
          },
        ],
      },
      message: "Erro no AdminCreateController",
      success: false,
    });
  }
};

module.exports = AdminCreateController;