const Admin = require("../../../models/Admin");

const AdminPictureValidator = async (req, res, next) => {
    try {
        const { id } = req.params;

        // Verificar se o admin existe
        const admin = await Admin.findByPk(id);
        if (!admin) {
            return res.status(404).json({
                code: 404,
                error: {
                    details: [
                        {
                            field: "id",
                            message: "Admin não encontrado."
                        }
                    ]
                },
                message: "Erro ao adicionar imagem.",
                success: false
            });
        }

        // Verificar se o admin já possui uma foto
        if (admin.IDimagemPerfil) {
            return res.status(400).json({
                code: 400,
                error: {
                    details: [
                        {
                            field: "imagemPerfil",
                            message: "O admin já possui uma foto de perfil."
                        }
                    ]
                },
                message: "Erro ao adicionar imagem.",
                success: false
            });
        }

        // Verificar se o arquivo foi enviado
        if (!req.files || !req.files.imagemPerfil) {
            return res.status(400).json({
                code: 400,
                error: {
                    details: [
                        {
                            field: "imagemPerfil",
                            message: "Nenhuma imagem foi enviada."
                        }
                    ]
                },
                message: "Erro ao adicionar imagem.",
                success: false
            });
        }

        const imagemPerfil = req.files.imagemPerfil;

        // Verificar se o arquivo é uma imagem
        const mimeTypesPermitidos = ["image/jpeg", "image/png"];
        if (!mimeTypesPermitidos.includes(imagemPerfil.mimetype)) {
            return res.status(400).json({
                code: 400,
                error: {
                    details: [
                        {
                            field: "imagemPerfil",
                            message: "O arquivo enviado não é uma imagem válida (JPEG ou PNG)."
                        }
                    ]
                },
                message: "Erro ao adicionar imagem.",
                success: false
            });
        }

        // Se todas as verificações passarem, prosseguir
        next();
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            code: 500,
            error: {
                details: [
                    {
                        validator: "AdminPictureValidator",
                        message: "Erro interno."
                    }
                ]
            },
            message: "Erro no AdminPictureValidator.",
            success: false
        });
    }
};

module.exports = AdminPictureValidator;