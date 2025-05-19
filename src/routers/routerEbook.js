const { Router } = require("express");
const multer = require("multer");
const upload = multer({ storage: multer.memoryStorage() });
const router = Router();

const EbookCreateController = require("../controllers/EbooksControllers/EbookCreateController.js");
const EbookDeleteController = require("../controllers/EbooksControllers/EbookDeleteController.js");
const EbookGetAllController = require("../controllers/EbooksControllers/EbookGetAllController.js");
const EbookUpdateController = require("../controllers/EbooksControllers/EbookupdateController");
const generateEpub = require("../controllers/EbooksControllers/GenerateEpubController.js");

router.post("/", upload.fields([
    { name: "Ebook", maxCount: 1 },
]), EbookCreateController);

router.get("/", EbookGetAllController);

router.patch("/:id", upload.fields([
    { name: "Ebook", maxCount: 1 },
]), EbookUpdateController);

router.delete("/:id", EbookDeleteController);

const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, "uploads/"),
    filename: (req, file, cb) =>
        cb(null, `${Date.now()}-${file.originalname}`)
});

const uploadEpub = multer({ storage });

router.post("/generate-epub", uploadEpub.fields([{
    name: "Ebook", maxCount: 1
}]), generateEpub);


module.exports = router