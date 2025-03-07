const Admin = require("../../models/Admin");
const AdminFoto = require("../../models/adminFoto");

const AdminUpdatePictureService = async (files, id) => {
    try {
        const imagemPerfil = files.imagemPerfil;

        // Buscar o admin pelo ID
        const admin = await Admin.findByPk(id);



        if (!admin) {
            return {
                code: 404,
                error: {
                    details: [
                        {
                            field: "id",
                            message: "Admin não encontrado."
                        }
                    ]
                },
                message: "Erro ao atualizar imagem.",
                success: false
            };
        }

        // Verificar se o admin já possui uma foto
        if (!admin.IDimagemPerfil) {
            return {
                code: 400,
                error: {
                    details: [
                        {
                            field: "imagemPerfil",
                            message: "O admin não possui uma foto de perfil para atualizar."
                        }
                    ]
                },
                message: "Erro ao atualizar imagem.",
                success: false
            };
        }

        // Atualizar a foto existente
        const adminFoto = await AdminFoto.findByPk(admin.IDimagemPerfil);
        if (!adminFoto) {
            return {
                code: 404,
                error: {
                    details: [
                        {
                            field: "imagemPerfil",
                            message: "Foto do admin não encontrada."
                        }
                    ]
                },
                message: "Erro ao atualizar imagem.",
                success: false
            };
        }

        await adminFoto.update({
            Image: imagemPerfil.data,
            mimeType: imagemPerfil.mimetype
        });

        return {
            code: 200,
            admin: {
                id: admin.id,
                IDimagemPerfil: adminFoto.id
            },
            message: "Imagem do admin atualizada com sucesso",
            success: true,
        };

    } catch (error) {
        console.error(error);
        throw new Error(error.message);
    }
};

module.exports = AdminUpdatePictureService;