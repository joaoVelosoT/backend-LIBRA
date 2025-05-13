const { Router } = require("express");
const multer = require("multer");
const upload = multer({ storage: multer.memoryStorage() });
const router = Router();

const AudioBookCreateValidator = require("../middlewares/Validators/AudioBookValidators/AudioBookCreateValidator");
const AudioBookCreateController = require("../controllers/AudiobooksControllers/AudiobookCreateController");
const AudioBookDeleteController = require("../controllers/AudiobooksControllers/AudiobookDeleteController");
const AudioBookUpdateController = require("../controllers/AudiobooksControllers/AudiobookUpdateController");
const AudioBookGetAllController = require("../controllers/AudiobooksControllers/AudiobookGetAllController");
const AudioBookGetByBookController = require("../controllers/AudiobooksControllers/AudioBookGetByBookController");
const AudioBookDeleteByBookController = require("../controllers/AudiobooksControllers/AudioBookDeleteByBookController");

// Rotas existentes
router.post(
  "/",
  upload.fields([{ name: "audioBook" }]),
  AudioBookCreateValidator,
  AudioBookCreateController
);

router.get("/", AudioBookGetAllController);

router.patch("/:id", upload.fields([{ name: "audiobook" }]), AudioBookUpdateController);

router.delete("/:id", AudioBookDeleteController);

// Novas rotas
router.get("/book/:idLivro", AudioBookGetByBookController);
router.delete("/book/:idLivro", AudioBookDeleteByBookController);

module.exports = router;