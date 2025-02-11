const typesDisabled = require("../../models/typesDisabled");

const typesDisabledDeleteService = {
  delete: async (name) => {
    try {


    const usersUpdated = await UserUpdateForDelete(disabled.id);

    

      const typeDisabledDelete = await typesDisabled.destroy({
        where: {
          name: name,
        },
      });

      if (typeDisabledDelete === null) {
        return {
          code: 404,
          data: {
            id: typeDisabledDelete,
          },
          erro: "Tipo de deficiência não encontrada!",
          message: "Busque um tipo de deficiência pelo nome correto.",
          success: false,
        };
      }

      return {
        code: 200,
        data: {
          typeDisabledDelete,
        },
        message: "Tipo de deficiência Deletada com sucesso!",
        success: true,
      };
    } catch (error) {
      console.error(error);
      throw new Error(error);
    }
  },
};

module.exports = typesDisabledDeleteService;
