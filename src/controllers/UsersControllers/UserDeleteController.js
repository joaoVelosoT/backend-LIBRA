const UserDeleteService = require("../../services/UsersServices/UserDeleteService");

const UserDeleteController = async (req, res, next) => {
  try {
    const user = await UserDeleteService(req.params.id);
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
            controller: "UserDeleteController",
            message: "Erro interno",
          },
        ],
      },
      message: "Erro no UserDeleteController",
      success: false,
    });
  }
};

module.exports = UserDeleteController;
