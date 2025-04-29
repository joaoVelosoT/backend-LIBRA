const { Storage } = require("@google-cloud/storage");
const path = require("path");
const Arquivos = require('../../models/Arquivos');

// Configuração do Google Cloud Storage
const storage = new Storage({
  keyFilename: path.join(process.env.GOOGLE_APPLICATION_CREDENTIALS),
});
const bucketName = "libra_tcc";
const bucket = storage.bucket(bucketName);
const allowedMimeTypes = [
  'image/jpeg',
  'image/png',
  'image/gif',
  'application/pdf',
  'video/mp4',
  'audio/mpeg',
];
const normalizeFileName = (fileName) => {
  return fileName.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
};

const uploadCreateService = {
  create: async (originalname, buffer, mimetype, tipoArquivo, nomePasta) => {
    try {
      if (!allowedMimeTypes.includes(mimetype)) {
        return {
          code: 400,
          error: { details: [{ service: "UploadCreateService", message: "Tipo de arquivo não permitido." }] },
          message: "Tipo de arquivo não permitido.",
          success: false,
        };
      }

      const normalizedFileName = normalizeFileName(originalname);
      const fileName = `${nomePasta}/${tipoArquivo}/${Date.now()}-${normalizedFileName}`;
      const file = bucket.file(fileName);

      await file.save(buffer, { metadata: { contentType: mimetype } });
      await file.makePublic();

      const publicUrl = `https://storage.googleapis.com/${bucketName}/${fileName}`;
      const arquivo = await Arquivos.create({
        nome: normalizedFileName,
        url: publicUrl,
        tipo: mimetype,
      });

      return {
        success: true,
        fileUrl: publicUrl,
        arquivoId: arquivo.id,
      };
    } catch (error) {
      console.error(error);
      return {
        code: 500,
        error: { details: [{ service: "UploadCreateService", message: error.message }] },
        message: "Erro ao fazer upload do arquivo",
        success: false,
      };
    }
  },
};

module.exports = uploadCreateService;