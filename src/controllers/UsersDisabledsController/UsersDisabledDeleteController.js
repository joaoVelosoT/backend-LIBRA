const UserDisabledDeleteService = require("../..//services/UsersDisabledServices/UsersDisabledDeleteService");

const UserDisabledDeleteController = async (req, res) => {
  try {
    const userDisabled = await UserDisabledDeleteService(req.params.id);
    
    if (!userDisabled.success) {
      return res.status(userDisabled.code).json(userDisabled);
    }

    return res.status(userDisabled.code).json({
      code: userDisabled.code,
      data: userDisabled.data,
      message: userDisabled.message,
      success: userDisabled.success,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      code: 500,
      error: {
        details: [
          {
            controller: "UserDisabledDeleteController",
            message: "Erro interno",
          },
        ],
      },
      message: "Erro no UserDisabledDeleteController",
      success: false,
    });
  }
};

module.exports = UserDisabledDeleteController;
