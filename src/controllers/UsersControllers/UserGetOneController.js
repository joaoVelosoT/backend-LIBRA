const UserGetOneService = require("../../services/UsersServices/UserGetOneService");

const UserGetOneController = async (req, res) => {
  try {
    const result = await UserGetOneService(req.params.id);
    return res.status(result.code).json(result);
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      code: 500,
      error: {
        details: [{
          controller: "UserGetOneController",
          message: error.message
        }]
      },
      message: "Erro no UserGetOneController",
      success: false
    });
  }
};

module.exports = UserGetOneController;