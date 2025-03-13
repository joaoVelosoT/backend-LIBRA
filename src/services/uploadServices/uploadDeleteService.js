const { Storage } = require("@google-cloud/storage");
const path = require("path");
const Arquivos = require('../../models/Arquivos');

// Configuração do Google Cloud Storage
const storage = new Storage({
    keyFilename: path.join(__dirname, "../../database/libra-453101-6caaf8b9ebee.json"), // Caminho das credenciais
});
const bucketName = "libra_tcc";
const bucket = storage.bucket(bucketName);

const uploadDeleteService = {
    delete: async (id) => {
        try {

            // Busca o arquivo no banco de dados pelo ID
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

            // Extrai o nome do arquivo no Google Cloud Storage
            const fileName = arquivo.url.split(`${bucketName}/`)[1];

            // Deleta o arquivo do Google Cloud Storage
            await bucket.file(fileName).delete();

            // Deleta o registro do arquivo no banco de dados
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
                            message: error.message, // Mostra a mensagem de erro real
                        },
                    ],
                },
                message: "Erro ao deletar arquivo",
                success: false,
            };
        }
    }
}

module.exports = uploadDeleteService