const UserGetAllService = require("../../services/UsersServices/UserGetAllService");

const UserGetAllController = async (req, res) => {
  try {
    const users = await UserGetAllService();
    if (!users.success) {
      return users;
    }

    console.log(users);

    return res.status(200).json({
      code: users.code,
      data: users.users,
      message: users.message,
      success: users.success,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      code: 500,
      error: {
        details: [
          {
            controller: "UserGetAllController",
            message: "Erro interno",
          },
        ],
      },
      message: "Erro no UserGetAllController",
      success: false,
    });
  }
};

module.exports = UserGetAllController;
