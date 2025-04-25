const crypto = require("crypto");
const Admin = require("../../../models/admin");
const sendAdminResetPasswordEmail = require("../../../services/AuthServices/adminEmailService");

const ForgotPasswordAdminController = async (req, res) => {
  try {
    const { email } = req.body;
    const admin = await Admin.findOne({ where: { email } });

    if (!admin) {
      return res.status(404).json({
        success: false,
        message: "Administrador não encontrado",
      });
    }

    // Gerar token único para redefinição de senha
    const resetToken = crypto.randomBytes(32).toString("hex");
    admin.resetPasswordToken = resetToken;
    admin.resetPasswordExpires = Date.now() + 3600000; // 1 hora
    await admin.save();

    // Enviar e-mail com o link de redefinição
    const emailResponse = await sendAdminResetPasswordEmail(email, resetToken);

    return res.status(200).json(emailResponse);
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Erro interno no servidor",
    });
  }
};

module.exports = ForgotPasswordAdminController;