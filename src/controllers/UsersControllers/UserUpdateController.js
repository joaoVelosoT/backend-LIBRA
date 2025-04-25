const UserUpdateService = require("../../services/UsersServices/UserUpdateService");

const UserUpdateController = async (req, res) => {
  try {
    // dataUpdate -> req.dataUpdate

    const { id_perfil_link } = req.body;

    const dataUpdate = {
      idUser: req.params.id,
      dataUpdate: req.dataUpdate,
      id_perfil_link
    };

    console.log(dataUpdate);


    const user = await UserUpdateService(dataUpdate);
    if (!user.success) {
      return res.status(user.code).json(user);
    }

    return res.status(user.code).json({
      code: user.code,
      data: user.user,
      message: user.message,
      success: user.success,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      code: 500,
      error: {
        details: [
          {
            controller: "UserUpdateController",
            message: "Erro interno",
          },
        ],
      },
      message: "Erro no UserUpdateController",
      success: false,
    });
  }
};

module.exports = UserUpdateController;
