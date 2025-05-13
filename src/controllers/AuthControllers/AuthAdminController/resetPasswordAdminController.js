const Admin = require("../../../models/Admin");
const bcrypt = require("bcryptjs");
const { Op } = require("sequelize");

const ResetPasswordAdminController = async (req, res) => {
  try {
    const { token } = req.params;
    const { newPassword } = req.body;

    const admin = await Admin.findOne({
      where: {
        resetPasswordToken: token,
        resetPasswordExpires: { [Op.gt]: Date.now() },
      },
    });

    if (!admin) {
      return res.status(400).json({
        success: false,
        message: "Token inválido ou expirado",
      });
    }

    // Atualiza a senha do admin
    const hashedPassword = await bcrypt.hash(newPassword, 12);
    admin.password = hashedPassword;
    admin.resetPasswordToken = null;
    admin.resetPasswordExpires = null;
    await admin.save();

    return res.status(200).json({
      success: true,
      message: "Senha redefinida com sucesso!",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Erro interno no servidor",
    });
  }
};

module.exports = ResetPasswordAdminController;