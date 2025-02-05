const RegisterUserService = require("../../services/AuthServices/registerUserService");

const RegisterUserController = async (req, res, next) => {
  try {
    const user = await RegisterUserService(req.user);
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
            controller: "RegisterUserController",
            message: "Erro interno",
          },
        ],
      },
      message: "Erro no RegisterUserController",
      success: false,
    });
  }
};

module.exports = RegisterUserController;
