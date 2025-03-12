const express = require("express");
const multer = require("multer");
const { Storage } = require("@google-cloud/storage");
const path = require("path");
const Arquivos = require("./models/Arquivos"); // Model Sequelize

require("dotenv").config();

const router = express.Router();

// Função para normalizar nomes de arquivos (remover acentos e caracteres especiais)
const normalizeFileName = (fileName) => {
    return fileName.normalize('NFD').replace(/[\u0300-\u036f]/g, ''); // Remove acentos
};

// Configuração do Multer para upload em memória
const upload = multer({
    storage: multer.memoryStorage(),
    limits: { fileSize: 50 * 1024 * 1024 }, // Limite de 50MB
});

// Configuração do Google Cloud Storage
const storage = new Storage({
    keyFilename: path.join(__dirname, "./database/libra-453101-6caaf8b9ebee.json"), // Caminho das credenciais
});
const bucketName = "libra_tcc";
const bucket = storage.bucket(bucketName);

// Tipos de arquivo permitidos
const allowedMimeTypes = ['image/jpeg', 'image/png', 'application/pdf', 'video/mp4', 'audio/mpeg'];

// 🚀 Rota de Upload
router.post("/upload", upload.single("file"), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: "Nenhum arquivo enviado." });
        }

        const { originalname, buffer, mimetype } = req.file;

        // Valida o tipo de arquivo
        if (!allowedMimeTypes.includes(mimetype)) {
            return res.status(400).json({ error: "Tipo de arquivo não permitido." });
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

        res.json({ message: "Upload bem-sucedido!", fileUrl: publicUrl });
    } catch (error) {
        console.error("Erro ao fazer upload:", error);
        res.status(500).json({ error: "Erro interno no servidor" });
    }
});

// Rota para listar arquivos
router.get("/arquivos", async (req, res) => {
    try {
        const arquivos = await Arquivos.findAll();
        res.json(arquivos);
    } catch (error) {
        console.error("Erro ao buscar arquivos:", error);
        res.status(500).json({ error: "Erro interno no servidor" });
    }
});

module.exports = router;