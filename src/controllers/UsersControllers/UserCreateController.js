const UserCreateService = require("../../services/UsersServices/UserCreateService");

const UserCreateController = async (req, res) => {
  try {
    const user = await UserCreateService(req.user);
    if (!user.success) {
      return res.status(user.code).json(user);
    }

    return res.status(user.code).json({
      code: user.code,
      data: user.user,
      message: user.message,
      success: true,
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
      success: false,
    });
  }
};

module.exports = UserCreateController;
