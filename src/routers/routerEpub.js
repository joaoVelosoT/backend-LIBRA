const { Router } = require("express");
const multer = require("multer");
const upload = multer({ storage: multer.memoryStorage() });
const router = Router();

const generateEpub = require("../controllers/EpubController/GenerateEpubController.js");

const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, "uploads/"),
    filename: (req, file, cb) =>
        cb(null, `${Date.now()}-${file.originalname}`)
});

const uploadEpub = multer({ storage });

router.post("/", uploadEpub.fields([{
    name: "Ebook", maxCount: 1
}]), generateEpub);

module.exports = router