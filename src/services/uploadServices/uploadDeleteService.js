const { Storage } = require("@google-cloud/storage");
const path = require("path");
const Arquivos = require('../../models/Arquivos');

const storage = new Storage({
    keyFilename: path.join(__dirname, "../../database/database"),
});
const bucketName = "libra_tcc";
const bucket = storage.bucket(bucketName);

const uploadDeleteService = {
    delete: async (id) => {
        try {
            const arquivo = await Arquivos.findByPk(id);

            if (!arquivo) {
                console.log("Arquivo não encontrado no banco de dados.");
                return {
                    code: 404,
                    error: {
                        details: [
                            {
                                service: "UploadDeleteService",
                                message: "Arquivo não encontrado no banco de dados.",
                            },
                        ],
                    },
                    message: "Arquivo não encontrado.",
                    success: false,
                };
            }

            const fileName = arquivo.url.split(`${bucketName}/`)[1];
            console.log("Tentando deletar arquivo do GCS:", fileName);

            const file = bucket.file(fileName);

            // Verifica se o arquivo existe no GCS
            const [exists] = await file.exists();

            if (!exists) {
                console.log("Arquivo não encontrado no GCS:", fileName);
                return {
                    code: 404,
                    error: {
                        details: [
                            {
                                service: "UploadDeleteService",
                                message: `Arquivo não encontrado no GCS: ${fileName}`,
                            },
                        ],
                    },
                    message: "Arquivo não encontrado.",
                    success: false,
                };
            }

            // Deleta o arquivo do GCS
            await file.delete();
            console.log("Arquivo deletado do GCS:", fileName);

            // Deleta o registro do arquivo no banco de dados
            await arquivo.destroy();
            console.log("Registro do arquivo deletado do banco de dados.");

            return {
                success: true,
                message: "Arquivo deletado com sucesso!",
            };
        } catch (error) {
            console.error("Erro ao deletar arquivo:", error);
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
            console.log("Tentando deletar pasta:", folderPath);

            const [files] = await bucket.getFiles({ prefix: folderPath });

            if (files.length === 0) {
                console.log("Pasta não encontrada no GCS:", folderPath);
                return {
                    code: 404,
                    error: {
                        details: [
                            {
                                service: "UploadDeleteService",
                                message: `Pasta não encontrada no GCS: ${folderPath}`,
                            },
                        ],
                    },
                    message: "Pasta não encontrada.",
                    success: false,
                };
            }

            await Promise.all(files.map(file => file.delete()));
            console.log("Pasta e todos os arquivos deletados com sucesso:", folderPath);

            return {
                success: true,
                message: "Pasta e todos os arquivos deletados com sucesso!",
            };
        } catch (error) {
            console.error("Erro ao deletar pasta:", error);
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