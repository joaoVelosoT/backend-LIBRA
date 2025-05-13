const Admin = require("../../models/Admin");
const AdminFoto = require("../../models/adminFoto");
const bycrpt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const sequelize = require("../../database/config");
const uploadCreateService = require("../uploadServices/uploadCreateService");

const AdminCreateService = async (adminData, files) => {
  const transaction = await sequelize.transaction();

  try {
    const existsEmail = await Admin.findOne({
      where: { email: adminData.email },
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
        generateNIF,
      };
    }

    const passwordCript = await bycrpt.hashSync(adminData.password, 12);
    adminData.password = passwordCript;

    // Criar o admin no banco de dados
    const admin = await Admin.create(
      {
        ...adminData,
        NIF,
      },
      { transaction }
    );

    // Upload da foto do admin (se houver)
    if (files && files.imagemPerfil) {
      const { originalname, buffer, mimetype } = files.imagemPerfil; // Acessa diretamente o arquivo

      const nomePasta = `admins/${admin.name.replace(/\s+/g, "_")}`;

      const uploadResult = await uploadCreateService.create(
        originalname,
        buffer,
        mimetype,
        "foto",
        nomePasta
      );

      if (!uploadResult.success) {
        await transaction.rollback();
        return uploadResult; // Retorna o erro do upload
      }

      // Criar a foto do admin na tabela AdminFoto
      const adminFoto = await AdminFoto.create(
        {
          id_link: uploadResult.arquivoId,
        },
        { transaction }
      );

      // Atualizar o admin com o ID da foto
      admin.id_AdminFoto = adminFoto.id;
      await admin.save({ transaction });
    }

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
      admin,
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