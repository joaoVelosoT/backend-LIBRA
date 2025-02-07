const UsersDisabledCreateService = require("../../services/UsersDisabledServices/UsersDisabledCreateService");

const UsersDisabledCreateController = async (req, res) => {
  try {
    const userDisabled = await UsersDisabledCreateService(
      req.dataUsersDisabled
    );

    if (!userDisabled.success) {
      return res.status(userDisabled.code).json(userDisabled);
    }

    return res.status(userDisabled.code).json({
      code: userDisabled.code,
      data: userDisabled.data,
      message: userDisabled.message,
      success: true,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      code: 500,
      error: {
        details: [
          {
            controller: "UsersDisabledCreate",
            message: "Erro interno",
          },
        ],
      },
      message: "Erro no UsersDisabledCreate",
      success: false,
    });
  }
};

module.exports = UsersDisabledCreateController;
