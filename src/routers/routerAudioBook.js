const { Router } = require("express");
const multer = require("multer");
const upload = multer({ storage: multer.memoryStorage() });
const router = Router();

const AudiobookCreateController = require("../controllers/AudiobooksControllers/AudiobookCreateController.js");
const AudiobookDeleteController = require("../controllers/AudiobooksControllers/AudiobookDeleteController.js");
const AudiobookUpdateController = require("../controllers/AudiobooksControllers/AudiobookUpdateController.js")
const AudiobookGetAllController = require("../controllers/AudiobooksControllers/AudiobookGetAllController.js");

router.post("/", upload.fields([
    { name: "audioBook", maxCount: 1 },
]), AudiobookCreateController);
router.get("/", AudiobookGetAllController);

router.patch("/:id", upload.fields([
    { name: "audiobook", maxCount: 1 },
]), AudiobookUpdateController); 

router.delete("/:id", AudiobookDeleteController);


module.exports = router