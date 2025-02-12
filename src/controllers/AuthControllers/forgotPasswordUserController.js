const crypto = require("crypto");
const User = require("../../models/User");
const sendResetPasswordEmail = require("../../services/AuthServices/emailService");

const ForgotPasswordController = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "Usuário não encontrado",
      });
    }

    // Gerar token único para redefinição de senha
    const resetToken = crypto.randomBytes(32).toString("hex");
    user.resetPasswordToken = resetToken;
    user.resetPasswordExpires = Date.now() + 3600000; // Expira em 1 hora
    await user.save();

    // Enviar e-mail com o link de redefinição
    const emailResponse = await sendResetPasswordEmail(email, resetToken);

    return res.status(200).json(emailResponse);
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Erro interno no servidor",
    });
  }
};

module.exports = ForgotPasswordController;
