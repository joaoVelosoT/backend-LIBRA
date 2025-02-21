const UserGetOneService = require("../../services/UsersServices/UserGetOneService");

const UserGetOneController = async (req, res) => {
  try {
    const user = await UserGetOneService(req.params.id);

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
            controller: "UserGetOneController",
            message: "Erro interno",
          },
        ],
      },
      message: "Erro no UserGetOneController",
      success: false,
    });
  }
};

module.exports = UserGetOneController;
