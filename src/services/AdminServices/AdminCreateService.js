const Admin = require("../../models/Admin");
const bycrpt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const sequelize = require("../../database/config");

const AdminCreateService = async (dataAdmin) => {
  const transaction = await sequelize.transaction();

  try {
    const existsEmail = await Admin.findOne({
      where: { email: dataAdmin.email },
    });

    if (existsEmail) {
      return {
        code: 409,
        error: {
          details: [
            {
              field: "email",
              message: "O email enviado já existe",
            },
          ],
        },
        message: "Erro ao criar admin",
        success: false,
      };
    }

    const generateNIF = () => {
      return Math.floor(100000 + Math.random() * 900000); 
    };

    const NIF = generateNIF();

    const existsNIF = await Admin.findOne({
      where: { NIF },
    });

    if (existsNIF) {
      return {
        generateNIF
      };
    }

    const passwordCript = await bycrpt.hashSync(dataAdmin.password, 12);
    dataAdmin.password = passwordCript;

    const admin = await Admin.create(
      {
        ...dataAdmin,
        NIF,
      },
      { transaction }
    );

    // Gerar token JWT
    const token = jwt.sign(
      {
        id: admin.id,
        email: admin.email,
        role: "admin", 
      },
      process.env.SECRET,
      { expiresIn: "10h" } 
    );

    // Confirmando a transação
    await transaction.commit();

    return {
      code: 201,
      admin: {
        id: admin.id,
        name: admin.name,
        email: admin.email,
        NIF: admin.NIF,
      },
      token, 
      message: "Admin criado com sucesso",
      success: true,
    };
  } catch (error) {
    await transaction.rollback();
    console.error(error);
    throw new Error(error.message);
  }
};

module.exports = AdminCreateService;