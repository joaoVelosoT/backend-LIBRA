const UserDisabled = require("../../models/UsersDisableds");

const UserDisabledUpdateService = async (idUserDisabled, data) => {
  try {
    const userDisabled = await UserDisabled.findByPk(idUserDisabled);

    if (!userDisabled) {
      return {
        code: 404,
        error: {
          details: [{ message: "Relacionamento usuário-deficiência não encontrado no banco de dados" }],
        },
        message: "Erro ao buscar relacionamento usuário-deficiência no banco de dados",
        success: false,
      };
    }
    
    await userDisabled.update({ idDisabled: data.idDisabled });

    return {
      code: 200,
      data: userDisabled,
      message: "Deficiência do usuário atualizada com sucesso",
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
            message: "Erro interno ao atualizar deficiência do usuário",
          },
        ],
      },
      message: "Erro ao atualizar deficiência do usuário",
      success: false,
    };
  }
};

module.exports = UserDisabledUpdateService;
