const jwt = require("jsonwebtoken");
const User = require("../../../models/User"); 

const verifyTokenUser = async (req, res, next) => {
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

    // Busca o usuário no banco de dados usando o modelo User
    const user = await User.findOne({ where: { id: decoded.id } });

    if (!user || user.validToken !== token) {
      console.log("Token inválido ou expirado. Token no banco:", user?.validToken); // Log para depuração
      return res.status(401).json({
        code: 401,
        message: "Token inválido. Faça login novamente.",
        success: false,
      });
    }

    req.user = decoded; // Aqui o req.user é definido
    next();
  } catch (error) {
    console.error("Erro no verifyTokenUser:", error);
    return res.status(401).json({
      code: 401,
      message: "Token inválido ou expirado.",
      success: false,
    });
  }
};

module.exports = verifyTokenUser;