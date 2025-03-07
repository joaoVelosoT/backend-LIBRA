const jwt = require("jsonwebtoken");
const Admin = require("../../../models/Admin");

const verifyTokenAdmin = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1]; // Pega o token do cabeçalho

  if (!token) {
    return res.status(401).json({
      code: 401,
      message: "Token não fornecido.",
      success: false,
    });
  }

  try {
    // Verifica a validade do token
    const decoded = jwt.verify(token, process.env.SECRET);

    // Busca o admin no banco de dados
    const admin = await Admin.findOne({ where: { id: decoded.id } });

    if (!admin || admin.validToken !== token) {
      return res.status(401).json({
        code: 401,
        message: "Token inválido. Faça login novamente.",
        success: false,
      });
    }

    // Adiciona os dados decodificados ao request
    req.user = decoded; // Aqui o req.user é definido
    next();
  } catch (error) {
    return res.status(401).json({
      code: 401,
      message: "Token inválido ou expirado.",
      success: false,
    });
  }
};

module.exports = verifyTokenAdmin;