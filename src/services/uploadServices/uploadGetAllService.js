const { Storage } = require("@google-cloud/storage");
const path = require("path");
const Arquivos = require('../../models/Arquivos');

const storage = new Storage({
    keyFilename: path.join(__dirname, "../../database/libra-453101-6caaf8b9ebee.json"), 
});
const bucketName = "libra_tcc";
const bucket = storage.bucket(bucketName);

const uploadGetAllService = {
    getAll: async () => {
        try {
            const arquivos = await Arquivos.findAll();

            if (arquivos.length === 0) {
                return {
                    code: 200,
                    arquivos: [],
                    message: "Nenhum arquivo encontrado",
                    success: true,
                };
            }

            const arquivosComStatus = await Promise.all(
                arquivos.map(async (arquivo) => {
                    const fileName = arquivo.url.split(`${bucketName}/`)[1];
                    const file = bucket.file(fileName);
                    const [exists] = await file.exists();

                    return {
                        ...arquivo.toJSON(),
                        existsOnCloud: exists, 
                    };
                })
            );

            return {
                code: 200,
                arquivos: arquivosComStatus,
                message: "Todos os arquivos encontrados",
                success: true,
            };
        } catch (error) {
            console.error(error);
            return {
                code: 500,
                error: {
                    details: [
                        {
                            service: "UploadGetAllService",
                            message: error.message, 
                        },
                    ],
                },
                message: "Erro ao buscar arquivos",
                success: false,
            };
        }
    }
};

module.exports = uploadGetAllService;