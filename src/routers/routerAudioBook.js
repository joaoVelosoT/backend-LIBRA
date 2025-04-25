const { Router } = require("express");
const multer = require("multer");
const upload = multer({ storage: multer.memoryStorage() });
const router = Router();

const AudioBookCreateValidator = require("../middlewares/Validators/AudioBookValidators/AudioBookCreateValidator");
const AudioBookCreateController = require("../controllers/AudioBooksControllers/AudioBookCreateController");
const AudioBookDeleteController = require("../controllers/AudioBooksControllers/AudioBookDeleteController");
const AudioBookUpdateController = require("../controllers/AudioBooksControllers/AudioBookUpdateController");
const AudioBookGetAllController = require("../controllers/AudioBooksControllers/AudioBookGetAllController");
const AudioBookGetByBookController = require("../controllers/AudioBooksControllers/AudioBookGetByBookController");
const AudioBookDeleteByBookController = require("../controllers/AudioBooksControllers/AudioBookDeleteByBookController");

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