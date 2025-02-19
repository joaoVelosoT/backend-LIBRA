const Admin = require("../../models/Admin");
const bycrpt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const AdminLoginService = async (dataLogin) => {
  try {
    const { NIF, password } = dataLogin;

    // Buscar o admin pelo NIF
    const admin = await Admin.findOne({ where: { NIF } });
    if (!admin) {
      return {
        code: 400,
        error: {
          details: [
            {
              field: "NIF",
              message: "NIF não encontrado",
            },
          ],
        },
        message: "Erro ao validar login",
        success: false,
      };
    }

    // Validar a senha
    const passwordDecode = await bycrpt.compareSync(password, admin.password);
    if (!passwordDecode) {
      return {
        code: 401,
        error: {
          details: [
            {
              field: "password",
              message: "Senha incorreta",
            },
          ],
        },
        message: "Erro ao validar login",
        success: false,
      };
    }

    // Gerar token JWT
    const token = jwt.sign(
      {
        id: admin.id,
        email: admin.email,
        role: "admin", // Adicionando a role para diferenciar admin de user
      },
      process.env.SECRET,
      { expiresIn: "10h" } // Token expira em 10 horas
    );

    return {
      code: 201,
      data: {
        token,
        admin: {
          id: admin.id,
          name: admin.name,
          email: admin.email,
          NIF: admin.NIF,
        },
      },
      message: "Login realizado com sucesso",
      success: true,
    };
  } catch (error) {
    console.error(error);
    throw new Error(error.message);
  }
};

module.exports = AdminLoginService;