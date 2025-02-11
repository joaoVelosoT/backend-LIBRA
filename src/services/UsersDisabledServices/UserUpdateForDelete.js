const UserDisabled = require("../../models/UsersDisableds");
const UserDisabledUpdateService = require("./UsersDisabledUpdateService");

const UserUpdateForDelete = async (idDisabled) => {
  try {
    // Todos os users que seriam deletados
    const usersDisabled = await UserDisabled.findAll({
      where: {
        idDisabled: idDisabled,
      },
    });

    console.log("=======================================");
    console.log(usersDisabled);
    console.log("=======================================");

    for (const user of usersDisabled) {
      // atualizar
      const userUpdated = await UserDisabledUpdateService(user.id, {
        idDisabled: null,
      });
      if (!userUpdated.success) {
        return {
          message: "Erro ao tentar atualizar user",
        };
      }
    }

    // usersDisabled.forEach(async (user) => {});

    console.log("=======================================");
    console.log("atualizou todos");
    console.log("=======================================");

    return true;
  } catch (error) {
    console.error(error);
    throw new Error(error.message);
  }
};

module.exports = UserUpdateForDelete;
