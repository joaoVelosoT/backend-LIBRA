const jwt = require("jsonwebtoken");
const Admin = require("../models/Admin"); 

const AuthAdminMiddleware = async (req, res, next) => {
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

    const admin = await Admin.findOne({ where: { id: decoded.id } });
    if (!admin || admin.validToken !== token) {
      return res.status(401).json({
        code: 401,
        error: {
          details: [
            {
              message: "Token inválido. Faça login novamente.",
            },
          ],
        },
        message: "Erro de autenticação",
        success: false,
      });
    }

    req.admin = decoded;
    next();
  } catch (error) {
    console.error("Erro no AuthAdminMiddleware:", error);
    return res.status(500).json({
      code: 500,
      error: {
        details: [
          {
            message: "Erro interno",
          },
        ],
      },
      message: "Erro no AuthAdminMiddleware",
      success: false,
    });
  }
};

module.exports = AuthAdminMiddleware;