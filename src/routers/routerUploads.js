const { Router } = require("express");
const router = Router();
const multer = require("multer");

const uploadCreateController = require("../controllers/uploadController/uploadCreateController.js");
const uploadGetAllController = require("../controllers/uploadController/uploadGetAllController.js");
const uploadDeleteController = require("../controllers/uploadController/uploadDeleteController.js");

// Configuração do Multer para upload em memória
const upload = multer({
    storage: multer.memoryStorage(),
    limits: { fileSize: 1000 * 1024 * 1024 }, // Limite de 1000MB
});

router.post("/upload", upload.single("file"), uploadCreateController);
router.get("/arquivos", uploadGetAllController);
router.delete("/arquivos/:id", uploadDeleteController);

module.exports = router;