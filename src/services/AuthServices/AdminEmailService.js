const nodemailer = require("nodemailer");
require("dotenv").config();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const sendAdminResetPasswordEmail = async (email, token) => {
  try {
    const resetLink = `http://localhost:8080/auth/admin/reset-password/${token}`;
    
    const logoImage = "https://storage.googleapis.com/libra_tcc/LoomDivertido.png";

    const mailOptions = {
      from: `"Suporte LIBRA Admin" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Redefinição de Senha - Área Administrativa LIBRA",
      html: `
        <!DOCTYPE html>
        <html lang="pt-BR">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Redefinição de Senha Admin - LIBRA</title>
            <style>
                @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600&display=swap');
                
                body {
                    font-family: 'Poppins', Arial, sans-serif;
                    line-height: 1.6;
                    color: #444;
                    margin: 0;
                    padding: 0;
                    background-color: #f5f7fa;
                    width: 100% !important;
                }
                .email-wrapper {
                    width: 100%;
                    min-height: 100%;
                    background-color: #f5f7fa;
                    padding: 0;
                }
                .email-container {
                    max-width: 600px;
                    width: 100%;
                    margin: 0 auto;
                    background: #ffffff;
                    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
                }
                .header {
                    text-align: center;
                    padding: 40px 20px;
                    background: linear-gradient(135deg, #2ecc71, #27ae60);
                    color: white;
                }
                .logo {
                    max-width: 200px;
                    height: auto;
                    margin-bottom: 20px;
                }
                .header h1 {
                    margin: 0;
                    font-size: 28px;
                    font-weight: 600;
                    letter-spacing: 0.5px;
                }
                .content {
                    padding: 40px;
                    color: #555;
                    text-align: center;
                }
                .content h2 {
                    color: #333;
                    font-size: 22px;
                    margin-top: 0;
                    font-weight: 500;
                    text-align: center;
                }
                .button-container {
                    text-align: center;
                    margin: 40px 0;
                }
                .button {
                    display: inline-block;
                    padding: 16px 32px;
                    background: #27ae60;
                    color: white !important;
                    text-decoration: none;
                    border-radius: 8px;
                    font-weight: 500;
                    font-size: 18px;
                    box-shadow: 0 4px 12px rgba(39, 174, 96, 0.3);
                    transition: all 0.3s ease;
                }
                .button:hover {
                    background: #219955;
                    transform: translateY(-2px);
                    box-shadow: 0 6px 16px rgba(39, 174, 96, 0.4);
                }
                .link-box {
                    background: #e8f5e9;
                    border-left: 4px solid #27ae60;
                    padding: 18px;
                    margin: 30px 0;
                    border-radius: 0 8px 8px 0;
                    word-break: break-all;
                    font-size: 15px;
                    color: #333;
                    text-align: left;
                }
                .info-text {
                    font-size: 15px;
                    color: #666;
                    margin-bottom: 25px;
                    line-height: 1.7;
                    text-align: center;
                    max-width: 500px;
                    margin-left: auto;
                    margin-right: auto;
                }
                .divider {
                    height: 1px;
                    background: linear-gradient(to right, transparent, #ddd, transparent);
                    margin: 30px auto;
                    width: 80%;
                }
                .footer {
                    text-align: center;
                    padding: 30px;
                    font-size: 14px;
                    color: #888;
                    background: #f1f8e9;
                    display: block !important;
                }
                .social-icons {
                    margin: 20px 0;
                }
                .social-icon {
                    display: inline-block;
                    margin: 0 10px;
                    color: #27ae60;
                    text-decoration: none;
                    font-weight: 500;
                }
                .signature {
                    margin-top: 30px;
                    font-style: italic;
                    color: #666;
                    text-align: center;
                }
                .highlight {
                    color: #27ae60;
                    font-weight: 500;
                }
                @media only screen and (max-width: 600px) {
                    .content {
                        padding: 25px;
                    }
                    .header {
                        padding: 30px 15px;
                    }
                    .header h1 {
                        font-size: 24px;
                    }
                    .button {
                        padding: 14px 28px;
                        font-size: 16px;
                    }
                    .info-text {
                        text-align: center;
                    }
                }
            </style>
        </head>
        <body>
            <div class="email-wrapper">
                <div class="email-container">
                    <div class="header">
                        <img src="${logoImage}" alt="LIBRA Logo" class="logo">
                        <h1>Redefinição de Senha - Administrador</h1>
                    </div>
                    
                    <div class="content">
                        <h2>Olá Administrador,</h2>
                        <p class="info-text">Recebemos uma solicitação para redefinir a senha da sua conta administrativa <span class="highlight">LIBRA</span>. Para continuar com o processo, clique no botão abaixo:</p>
                        
                        <div class="button-container">
                            <a href="${resetLink}" class="button">Redefinir Minha Senha</a>
                        </div>
                        
                        <div class="divider"></div>
                        
                        <p class="info-text">Por questões de segurança, este link expirará em <strong class="highlight">1 hora</strong>. Se você não solicitou a redefinição de senha, por favor ignore este e-mail ou entre em contato com nosso suporte.</p>
                        
                        <div class="signature">
                            <p>Atenciosamente,</p>
                            <p><strong>Equipe LIBRA</strong></p>
                        </div>
                    </div>
                    
                    <div class="footer">
                        <div class="social-icons">
                            <a href="#" class="social-icon">Facebook</a> •
                            <a href="#" class="social-icon">Instagram</a> •
                            <a href="https://www.linkedin.com/company/106685350/admin/dashboard/" class="social-icon">LinkedIn</a>
                        </div>
                        <p>© ${new Date().getFullYear()} LIBRA. Todos os direitos reservados.</p>
                        <p>Este é um e-mail automático, por favor não responda.</p>
                        <p>Caso necessite de ajuda, entre em contato com nosso <a href="mailto:suporte@libra.com" style="color: #27ae60;">suporte</a>.</p>
                    </div>
                </div>
            </div>
        </body>
        </html>
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

module.exports = sendAdminResetPasswordEmail;