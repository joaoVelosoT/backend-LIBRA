const Arquivos = require('../../models/Arquivos');

const uploadGetAllService = {
    getAll: async () => {
        try {

            const arquivos = await Arquivos.findAll();

            return arquivos;

        } catch (error) {
            console.error(error);
            return {
                code: 500,
                error: {
                    details: [
                        {
                            service: "UploadGetAllService",
                            message: error.message, // Mostra a mensagem de erro real
                        },
                    ],
                },
                message: "Erro ao fazer upload do arquivo",
                success: false,
            };
        }
    }
}

module.exports = uploadGetAllService;