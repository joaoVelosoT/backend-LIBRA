const { Router } = require("express");
const multer = require("multer");
const upload = multer({ storage: multer.memoryStorage() });
const router = Router();

const AudiobookCreateController = require("../controllers/AudioAudiobooksControllers/AudiobookCreateController.js");
// const AudiobookDeleteController = require("../controllers/AudiobooksControllers/AudiobookDeleteController.js");
const AudiobookGetAllController = require("../controllers/AudiobooksControllers/AudiobookGetAllController.js");

router.post("/", upload.fields([
    { name: "audioBook", maxCount: 10 },
]), AudiobookCreateController);
router.get("/", AudiobookGetAllController);
// router.delete("/:id", AudiobookDeleteController);

module.exports = router