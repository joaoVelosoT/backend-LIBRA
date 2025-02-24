const LoginUserService = require("../../../services/AuthServices/loginUserService");

const LoginUserController = async (req, res) => {
  try {
    const user = await LoginUserService(req.dataLogin);
    if (!user.success) {
      return res.status(user.code).json(user);
    }

    return res.status(user.code).json({
      code: user.code,
      data: user.data,
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
            controller: "LoginUserController",
            message: "Erro interno",
          },
        ],
      },
      message: "Erro no LoginUserController",
      success: false,
    });
  }
};

module.exports = LoginUserController;
