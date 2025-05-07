const { Router } = require("express");
const multer = require("multer");

// configurando multer para receber os arquivos de audio
const upload = multer({ storage: multer.memoryStorage() });
const router = Router();

const AudioBookCreateValidator = require("../middlewares/Validators/AudioBookValidators/AudioBookCreateValidator");
const AudioBookCreateController = require("../controllers/AudioBooksControllers/AudioBookCreateController");
const AudioBookDeleteController = require("../controllers/AudioBooksControllers/AudioBookDeleteController");
const AudioBookUpdateController = require("../controllers/AudioBooksControllers/AudioBookUpdateController");
const AudioBookGetAllController = require("../controllers/AudioBooksControllers/AudioBookGetAllController");
const AudioBookGetByBookController = require("../controllers/AudioBooksControllers/AudioBookGetByBookController");
const AudioBookDeleteByBookController = require("../controllers/AudioBooksControllers/AudioBookDeleteByBookController");

router.post(
  "/",
  upload.fields([{ name: "audioBook" }]),
  AudioBookCreateValidator, // valida as informações na criação do audiobook
  AudioBookCreateController // Controlador a criação do audiobook
);

router.get("/", AudioBookGetAllController);

router.patch("/:id", upload.fields([{ name: "audiobook" }]), AudioBookUpdateController); // Validação para aceitar apenas parâmetros 'Audiobook'

router.delete("/:id", AudioBookDeleteController);

// Rota para buscar o audiobook pelo id do book
router.get("/book/:idLivro", AudioBookGetByBookController);

// rota para deletar o audiobook pelo id Book
router.delete("/book/:idLivro", AudioBookDeleteByBookController);

module.exports = router;