const Admin = require("../../models/Admin");

const AdminGetByIdService = async (idAdmin) => {
  try {
    const admin = await Admin.findByPk(idAdmin, {
      include: [
        {
          association: "foto", 
          include: [
            {
              association: "arquivo", 
            },
          ],
        },
      ],
    });

    if (!admin) {
      return {
        code: 404,
        error: {
          details: [
            {
              message: "Admin não encontrado",
            },
          ],
        },
        message: "Erro ao buscar admin por ID",
        success: false,
      };
    }

    return {
      code: 200,
      admin,
      message: "Admin encontrado com sucesso",
      success: true,
    };
  } catch (error) {
    console.error(error);
    return {
      code: 500,
      error: {
        details: [
          {
            service: "AdminGetByIdService",
            message: error.message,
          },
        ],
      },
      message: "Erro ao buscar admin",
      success: false,
    };
  }
};

module.exports = AdminGetByIdService;