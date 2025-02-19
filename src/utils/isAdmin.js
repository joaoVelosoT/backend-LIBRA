const jwt = require("jsonwebtoken");

const AuthAdminMiddleware = async (req, res, next) => {
  console.log("AuthAdminMiddleware foi chamado!"); // Teste para ver se o middleware está rodando

  try {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      console.log("Nenhum token fornecido!");
      return res.status(401).json({
        code: 401,
        error: {
          details: [
            {
              message: "Token não fornecido",
            },
          ],
        },
        message: "Erro de autenticação",
        success: false,
      });
    }

    const decoded = jwt.verify(token, process.env.SECRET);
    console.log("Token decodificado:", decoded);

    if (decoded.role !== "admin") {
      console.log("Usuário não tem permissão de admin!");
      return res.status(403).json({
        code: 403,
        error: {
          details: [
            {
              message: "Acesso negado. Token inválido para esta operação.",
            },
          ],
        },
        message: "Erro de autorização",
        success: false,
      });
    }

    req.admin = decoded;
    next();
  } catch (error) {
    console.error("Erro no isAdmin:", error);
    return res.status(500).json({
      code: 500,
      error: {
        details: [
          {
            message: "Erro interno",
          },
        ],
      },
      message: "Erro no AuthAdmin",
      success: false,
    });
  }
};

module.exports = AuthAdminMiddleware;
