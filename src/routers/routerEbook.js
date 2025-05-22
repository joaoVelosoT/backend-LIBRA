const { Router } = require("express");
const multer = require("multer");
const upload = multer({ storage: multer.memoryStorage() });
const router = Router();

const EbookCreateController = require("../controllers/EbooksControllers/EbookCreateController.js");
const EbookDeleteController = require("../controllers/EbooksControllers/EbookDeleteController.js");
const EbookGetAllController = require("../controllers/EbooksControllers/EbookGetAllController.js");
const EbookUpdateController = require("../controllers/EbooksControllers/EbookupdateController");

router.post("/", upload.fields([
    { name: "Ebook", maxCount: 1 },
]), EbookCreateController);

router.get("/", EbookGetAllController);

router.patch("/:id", upload.fields([
    { name: "Ebook", maxCount: 1 },
]), EbookUpdateController);

router.delete("/:id", EbookDeleteController);
    


module.exports = router