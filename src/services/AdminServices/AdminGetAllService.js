const Admin = require("../../models/Admin");

const AdminGetAllService = {
  getAll: async () => {
    try {
      const admins = await Admin.findAll({
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

      if (admins.length === 0) {
        return {
          code: 200,
          data: [],
          message: "Nenhum administrador encontrado",
          success: true,
        };
      }

      return {
        code: 200,
        data: admins,
        message: "Lista de administradores obtida com sucesso",
        success: true,
      };
    } catch (error) {
      console.error(error);
      return {
        code: 500,
        error: {
          details: [
            {
              service: "AdminGetAllService",
              message: error.message,
            },
          ],
        },
        message: "Erro ao buscar administradores",
        success: false,
      };
    }
  },
};

module.exports = AdminGetAllService;