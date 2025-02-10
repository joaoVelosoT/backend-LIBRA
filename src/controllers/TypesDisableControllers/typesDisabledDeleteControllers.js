const typesDisabledDeleteService = require("../../services/TypesDisabledServices/typesDisabledDeleteServices");
const nameExists = require('../../services/TypesDisabledServices/nameExists');

const typeDisabledDeleteController = {
  delete: async (req, res) => {
    try {
      const { name } = req.params;

      const nameValid = await nameExists.validNameExists(name)

      if (!nameValid) {
        const data = {
          code: 400,
          erro: "Tipo de deficiência não encontrada!",
          message: "Busque um tipo de deficiência pelo nome correto.",
          success: false,
        }

        return res.status(400).json(data)
      }

      const type = await typesDisabledDeleteService.delete(name);

      return res.status(201).json(type);
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        code: 500,
        error: {
          details: [
            {
              controller: "typeDisabledCreateController",
              message: "Erro interno",
            },
          ],
        },
        message: "Erro no typeDisabledCreateController",
        sucess: false,
      });
    }
  },
};

module.exports = typeDisabledDeleteController;
