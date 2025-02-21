const nodemailer = require("nodemailer");
require("dotenv").config();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const sendResetPasswordEmail = async (email, token) => {
  try {
    const resetLink = `http://localhost:8080/auth/reset-password/${token}`;

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Redefinição de Senha",
      html: `
        <h2>Redefinição de Senha</h2>
        <p>Para redefinir sua senha, clique no link abaixo:</p>
        <a href="${resetLink}">TOKEN: ${token}</a>
        <p>Se você não solicitou esta alteração, ignore este e-mail.</p>
      `,
    };

    await transporter.sendMail(mailOptions);

    return {
      code: 200,
      success: true,
      message: "E-mail de redefinição enviado com sucesso!",
    };
  } catch (error) {
    console.error("Erro ao enviar e-mail:", error);

    return {
      code: 500,
      success: false,
      message: "Erro ao enviar e-mail",
      error: error.message,
    };
  }
};

module.exports = sendResetPasswordEmail;
