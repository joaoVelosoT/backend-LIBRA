const { Router } = require("express");
const router = Router();
const EventoCreateController = require("../controllers/EventosControllers/EventoCreateController");
const EventoGetAllController = require("../controllers/EventosControllers/EventoGetAllController");
const EventoGetByIdController = require("../controllers/EventosControllers/EventoGetByIdController");
const EventoUpdateController = require("../controllers/EventosControllers/EventoUpdateController");
const EventoDeleteController = require("../controllers/EventosControllers/EventoDeleteController");
const EventoCreateValidator = require("../middlewares/Validators/EventoValidators/EventoCreateValidator");
const EventoUpdateValidator = require("../middlewares/Validators/EventoValidators/EventoUpdateValidator");
const EventoAddPictureController = require("../controllers/EventosControllers/EventoAddPictureController");
const EventoAddPictureValidator = require("../middlewares/Validators/EventoValidators/EventoAddPictureValidator");
const ValidatorID = require("../middlewares/Validators/ValidatorID");
const multer = require("multer");
const upload = multer({ storage: multer.memoryStorage() });

// Rota para criar um evento
router.post(
  "/",
  upload.fields([
    { name: "capa", maxCount: 1 },
    { name: "gif", maxCount: 1 },
  ]),
  EventoCreateValidator,
  EventoCreateController
);

router.put(
  "/:id",
  ValidatorID,
  upload.none(),
  EventoUpdateValidator,
  EventoUpdateController
);

// Rota para adicionar/atualizar capa ou GIF
router.post(
  "/:id/addpicture",
  ValidatorID,
  upload.fields([
    { name: "capa", maxCount: 1 }, // Processa o campo "capa" (opcional)
    { name: "gif", maxCount: 1 },  // Processa o campo "gif" (opcional)
  ]),
  EventoAddPictureValidator,
  EventoAddPictureController
);

// Rota para listar todos os eventos
router.get("/", EventoGetAllController);

// Rota para buscar um evento por ID
router.get("/:id", ValidatorID, EventoGetByIdController);

// Rota para deletar um evento
router.delete("/:id", ValidatorID, EventoDeleteController);

module.exports = router;