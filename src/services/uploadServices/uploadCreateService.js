const { Storage } = require("@google-cloud/storage");
const path = require("path");
const Arquivos = require('../../models/Arquivos');

// Configuração do Google Cloud Storage
const storage = new Storage({
    keyFilename: path.join(__dirname, "../../database/libra-453101-6caaf8b9ebee.json"), // Caminho das credenciais
});
const bucketName = "libra_tcc";
const bucket = storage.bucket(bucketName);

// Tipos de arquivo permitidos
const allowedMimeTypes = ['image/jpeg', 'image/png', 'application/pdf', 'video/mp4', 'audio/mpeg'];

// Função para normalizar nomes de arquivos (remover acentos e caracteres especiais)
const normalizeFileName = (fileName) => {
    return fileName.normalize('NFD').replace(/[\u0300-\u036f]/g, ''); // Remove acentos
};

const uploadCreateService = {
    create: async (originalname, buffer, mimetype) => {
        try {
            // Valida o tipo de arquivo
            if (!allowedMimeTypes.includes(mimetype)) {
                return {
                    code: 400,
                    error: {
                        details: [
                            {
                                service: "UploadCreateService",
                                message: "Tipo de arquivo não permitido.",
                            },
                        ],
                    },
                    message: "Tipo de arquivo não permitido.",
                    success: false,
                };
            }

            // Normaliza o nome do arquivo
            const normalizedFileName = normalizeFileName(originalname);
            const fileName = `harryPotter/${Date.now()}-${normalizedFileName}`; // Adiciona um timestamp para evitar conflitos
            const file = bucket.file(fileName);

            // Upload do arquivo para o Cloud Storage
            await file.save(buffer, { metadata: { contentType: mimetype } });

            // Torna o arquivo público
            await file.makePublic();

            // URL pública do arquivo
            const publicUrl = `https://storage.googleapis.com/${bucketName}/${fileName}`;

            // Salvar no MySQL com Sequelize
            await Arquivos.create({
                nome: normalizedFileName, // Salva o nome normalizado
                url: publicUrl,
                tipo: mimetype,
            });

            return {
                success: true,
                fileUrl: publicUrl,
            };
        } catch (error) {
            console.error(error);
            return {
                code: 500,
                error: {
                    details: [
                        {
                            service: "UploadCreateService",
                            message: error.message, // Mostra a mensagem de erro real
                        },
                    ],
                },
                message: "Erro ao fazer upload do arquivo",
                success: false,
            };
        }
    }
};

module.exports = uploadCreateService;