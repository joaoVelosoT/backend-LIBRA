const { Storage } = require('@google-cloud/storage');
const storage = new Storage();
const bucketName = process.env.GCS_BUCKET_NAME;
const Arquivos = require("../../models/Arquivos");

const uploadUpdateService = {
    update: async (fileId, originalname, buffer, mimetype, type, nomeLivro) => {
        try {
            // Define o caminho do arquivo no Cloud Storage
            const fileName = `${nomeLivro}/${type}/${originalname}`;

            // Verifica se o arquivo existe no banco de dados
            const fileExists = await Arquivos.findByPk(fileId);
            if (!fileExists) {
                return {
                    success: false,
                    code: 404,
                    message: "Arquivo não encontrado no banco de dados",
                };
            }

            // Extrai o caminho do arquivo no GCS a partir da URL
            const url = fileExists.url;
            const filePath = url.replace(`https://storage.googleapis.com/${bucketName}/`, '');

            // Obtém o arquivo existente no GCS
            const file = storage.bucket(bucketName).file(filePath);

            // Verifica se o arquivo existe no GCS
            const [exists] = await file.exists();
            if (!exists) {
                return {
                    success: false,
                    code: 404,
                    message: "Arquivo não encontrado no Cloud Storage",
                };
            }

            // Substitui o arquivo existente pelo novo arquivo
            await file.save(buffer, {
                metadata: { contentType: mimetype },
            });

            return {
                success: true,
                message: "Arquivo atualizado com sucesso",
            };
        } catch (error) {
            console.error(error);
            return {
                success: false,
                code: 500,
                message: "Erro ao atualizar o arquivo no Cloud Storage",
            };
        }
    },
};

module.exports = uploadUpdateService;