const UserCreateService = require("../../services/UsersServices/UserCreateService");

const UserCreateController = async (req, res) => {
  try {
    const user = await UserCreateService(req.user);
    if (!user.sucess) {
      return res.status(user.code).json(user);
    }

    return res.status(user.code).json({
      code: user.code,
      data: user.user,
      message: user.message,
      sucess: true,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      code: 500,
      error: {
        details: [
          {
            controller: "UserCreateController",
            message: "Erro interno",
          },
        ],
      },
      message: "Erro no UserCreateController",
      sucess: false,
    });
  }
};

module.exports = UserCreateController;
