const UserGetAllService = require("../../services/UsersServices/UserGetAllService");

const UserGetAllController = async (req, res) => {
  try {
    const result = await UserGetAllService(req.query);
    
    return res.status(result.code).json(result);
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      code: 500,
      error: {
        details: [{
          controller: "UserGetAllController",
          message: error.message
        }]
      },
      message: "Erro no UserGetAllController",
      success: false
    });
  }
};

module.exports = UserGetAllController;