const UserDisabled = require("../../models/UsersDisableds");
const User = require("../../models/User");

const UserDisabledDeleteService = async (idUserDisabled) => {
  try {
    const userDisabled = await UserDisabled.findByPk(idUserDisabled);

    if (!userDisabled) {
      return {
        code: 404,
        error: {
          details: [{ message: "Usuário com deficiência não encontrado" }],
        },
        message: "Erro ao buscar usuário com deficiência no banco de dados",
        success: false,
      };
    }

    const userId = userDisabled.idUser;
    await userDisabled.destroy();
    const remainingDisabilities = await UserDisabled.findOne({ where: { idUser: userId } });

    if (!remainingDisabilities) {
      await User.update({ isDisabled: false }, { where: { id: userId } });
    }

    return {
      code: 200,
      data: userDisabled,
      message: "Usuário com deficiência removido do banco de dados com sucesso",
      success: true,
    };
  } catch (error) {
    console.error(error);
    return {
      code: 500,
      error: {
        details: [{ service: "UserDisabledDeleteService", message: "Erro interno ao deletar usuário com deficiência do banco de dados" }],
      },
      message: "Erro ao deletar usuário com deficiência do banco de dados",
      success: false,
    };
  }
};

module.exports = UserDisabledDeleteService;
