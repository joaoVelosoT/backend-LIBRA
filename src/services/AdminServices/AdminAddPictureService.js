const Admin = require("../../models/Admin");
const AdminFoto = require("../../models/adminFoto");

const AdminAddPictureService = async (files, id) => {
    try {

        const imagemPerfil = files.imagemPerfil;

        // Criar o registro no banco de dados
        const adminFoto = await AdminFoto.create({
            Image: imagemPerfil.data, // Usar o buffer da imagem
        });


        // Buscar o admin pelo ID
        const admin = await Admin.findByPk(id);

        // Atualizar o email do admin
        await admin.update({
            IDimagemPerfil: adminFoto.id
        });

        return {
            code: 201,
            admin: {
                image: adminFoto,
            },
            message: "Imagem do admin salva com sucesso",
            success: true,
        };

    } catch (error) {
        console.error(error);
        throw new Error(error.message);
    }
}

module.exports = AdminAddPictureService;