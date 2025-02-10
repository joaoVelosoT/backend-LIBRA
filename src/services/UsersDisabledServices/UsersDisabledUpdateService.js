const UserDisabled = require("../../models/UsersDisableds");

const UserDisabledUpdateService = async (idUserDisabled, data) => {
  try {
    const userDisabled = await UserDisabled.findByPk(idUserDisabled);
    if (!userDisabled) {
      return {
        code: 404,
        error: {
          details: [
            {
              message:
                "usuário com deficiêcia não encontrado no banco de dados",
            },
          ],
        },
        message: "Erro ao buscar usuário com deficiêcia no banco de dados",
        success: false,
      };
    }

    // se tiver o data.idUser, e o data.idDisabled para atualizar, validar se ele existe,
    // e validar também se o isDisabled é false antes de atualizar

    await userDisabled.update(data);

    return {
      code: 200,
      data: userDisabled,
      message:
        "usuário com deficiêcia atualizado com sucesso no banco de dados",
      success: true,
    };
  } catch (error) {
    console.error(error);
    return {
      code: 500,
      error: {
        details: [
          {
            service: "UserDisabledUpdateService",
            message:
              "Erro interno ao atualizar usuário com deficiêcia no banco de dados",
          },
        ],
      },
      message: "Erro ao atualizar usuário com deficiêcia no banco de dados",
      success: false,
    };
  }
};

module.exports = UserDisabledUpdateService;
