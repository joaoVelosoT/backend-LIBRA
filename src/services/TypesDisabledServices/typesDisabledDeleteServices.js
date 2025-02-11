const { ForeignKeyConstraintError } = require("sequelize");
const Disabled = require("../../models/Disabled");
const typesDisabled = require("../../models/typesDisabled");
const UserUpdateForDelete = require("../UsersDisabledServices/UserUpdateForDelete");

const typesDisabledDeleteService = {
  delete: async (name) => {
    try {
      
      // Buscando o tipo
      const typeDisabled = await typesDisabled.findOne({
        where: {
          name: name,
        },
      });

      // Buscar todas as deficiencias que usam esse tipo
      const getDisabledByType = await Disabled.findAll({
        where: { idDisabledTypes: typeDisabled.id },
      });

      for (const type of getDisabledByType) {
        // Deletar
        const usersUpdated = await UserUpdateForDelete(type.dataValues.id);
        console.log(usersUpdated);
        
        // console.log(type.dataValues.id)
      }

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
