const UserDisabled = require("../../models/UsersDisableds");

const UserDisabledDeleteService = async (idUserDisabled) => {
  try {
    const userDisabled = await UserDisabled.findByPk(idUserDisabled);
    if (!userDisabled) {
      return {
        code: 404,
        error: {
          details: [
            {
              message: "usuário com deficiêcia não encontrado",
            },
          ],
        },
        message: "Erro ao buscar usuário com deficiêcia",
        success: false,
      };
    }

    await userDisabled.destroy();

    return {
      code: 200,
      userDisabled,
      message: "usuário com deficiência deletado com sucesso",
      success: true,
    };
  } catch (error) {
    console.error(error);
    throw new Error(error.message);
  }
};

module.exports = UserDisabledDeleteService;
