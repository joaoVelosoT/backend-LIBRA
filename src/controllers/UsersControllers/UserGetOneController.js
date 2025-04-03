const UserGetOneService = require("../../services/UsersServices/UserGetOneService");

const UserGetOneController = async (req, res) => {
  try {
    const result = await UserGetOneService(req.params.id);
    
    // Ajuste na resposta para garantir que os dados sejam enviados
    return res.status(result.code).json({
      code: result.code,
      data: result.data || null, // Garante que os dados sejam enviados mesmo se forem null
      message: result.message,
      success: result.success
    });
    
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      code: 500,
      error: {
        details: [{
          controller: "UserGetOneController",
          message: "Erro interno"
        }]
      },
      message: "Erro no UserGetOneController",
      success: false
    });
  }
};

module.exports = UserGetOneController;