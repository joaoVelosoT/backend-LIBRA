const UserLogoutService = require("../../../services/AuthServices/UserLogoutService");

const UserLogoutController = async (req, res) => {
  try {
    const userId = req.user.id; // ID do usuário obtido do token decodificado

    const result = await UserLogoutService(userId);

    return res.status(result.code).json(result);
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      code: 500,
      error: {
        details: [
          {
            controller: "UserLogoutController",
            message: "Erro interno",
          },
        ],
      },
      message: "Erro no UserLogoutController",
      success: false,
    });
  }
};

module.exports = UserLogoutController;