const { Router } = require("express");
const multer = require("multer");
const upload = multer({ storage: multer.memoryStorage() });
const router = Router();

const EbookCreateController = require("../controllers/EbooksControllers/EbookCreateController.js");
const EbookDeleteController = require("../controllers/EbooksControllers/EbookDeleteController.js");
const EbookGetAllController = require("../controllers/EbooksControllers/EbookGetAllController.js");

router.post("/", upload.fields([
    { name: "Ebook", maxCount: 10 },
]), EbookCreateController);
router.get("/", EbookGetAllController);
router.delete("/:id", EbookDeleteController);

module.exports = router