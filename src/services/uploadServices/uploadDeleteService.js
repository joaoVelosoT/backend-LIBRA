const { Storage } = require("@google-cloud/storage");
const path = require("path");
const Arquivos = require('../../models/Arquivos');

const storage = new Storage({
    keyFilename: path.join(__dirname, "../../database/libra-453101-6caaf8b9ebee.json"),
});
const bucketName = "libra_tcc";
const bucket = storage.bucket(bucketName);

const uploadDeleteService = {
    delete: async (id) => {
        try {
            const arquivo = await Arquivos.findByPk(id);

            if (!arquivo) {
                return {
                    code: 404,
                    error: {
                        details: [
                            {
                                service: "UploadDeleteService",
                                message: "Arquivo não encontrado.",
                            },
                        ],
                    },
                    message: "Arquivo não encontrado.",
                    success: false,
                };
            }

            const fileName = arquivo.url.split(`${bucketName}/`)[1];
            await bucket.file(fileName).delete();
            await arquivo.destroy();

            return {
                success: true,
                message: "Arquivo deletado com sucesso!",
            };
        } catch (error) {
            console.error(error);
            return {
                code: 500,
                error: {
                    details: [
                        {
                            service: "UploadDeleteService",
                            message: error.message, 
                        },
                    ],
                },
                message: "Erro ao deletar arquivo",
                success: false,
            };
        }
    },

    deleteFolder: async (folderPath) => {
        try {
            const [files] = await bucket.getFiles({ prefix: folderPath });
            await Promise.all(files.map(file => file.delete()));

            return {
                success: true,
                message: "Pasta e todos os arquivos deletados com sucesso!",
            };
        } catch (error) {
            console.error(error);
            return {
                code: 500,
                error: {
                    details: [
                        {
                            service: "UploadDeleteService",
                            message: error.message, 
                        },
                    ],
                },
                message: "Erro ao deletar pasta",
                success: false,
            };
        }
    }
};

module.exports = uploadDeleteService;