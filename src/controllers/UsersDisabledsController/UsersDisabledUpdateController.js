const UserDisabledUpdateService = require("../../services/UsersDisabledServices/UsersDisabledUpdateService");

const UserDisabledUpdateController = async (req, res) => {
  try {
    const userDisabled = await UserDisabledUpdateService(req.params.id, req.dataUsersDisabled);

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
            controller: "UserDisabledUpdateController",
            message: "Erro interno",
          },
        ],
      },
      message: "Erro no UserDisabledUpdateController",
      success: false,
    });
  }
};

module.exports = UserDisabledUpdateController;
