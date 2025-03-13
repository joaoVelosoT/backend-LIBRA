const { Router } = require("express");
const router = Router();
const multer = require("multer");

const uploadCreateController = require("../controllers/uploadController/uploadCreateController.js");
const uploadGetAllController = require("../controllers/uploadController/uploadGetAllController.js");
// const uploadDeleteController = require("../controllers/uploadController/uploadDeleteController.js");

// Configuração do Multer para upload em memória
const upload = multer({
    storage: multer.memoryStorage(),
    limits: { fileSize: 50 * 1024 * 1024 }, // Limite de 50MB
});

router.post("/upload", upload.single("file"), uploadCreateController);
router.get("/arquivos", uploadGetAllController);
// router.delete("/", uploadDeleteController);

module.exports = router;