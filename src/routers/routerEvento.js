const { Router } = require("express");
const multer = require("multer");
const EventoCreateController = require("../controllers/EventosControllers/EventoCreateController");
const EventoGetAllController = require("../controllers/EventosControllers/EventoGetAllController");
const EventoGetByIdController = require("../controllers/EventosControllers/EventoGetByIdController");
const EventoUpdateController = require("../controllers/EventosControllers/EventoUpdateController");
const EventoDeleteController = require("../controllers/EventosControllers/EventoDeleteController");
const EventoCreateValidator = require("../middlewares/Validators/EventoValidators/EventoCreateValidator");

const ValidatorID = require("../middlewares/Validators/ValidatorID");
const upload = multer({ storage: multer.memoryStorage() });

const router = Router();

router.post(
    "/",
    upload.fields([
      { name: "capa", maxCount: 1 }, // Campo para a capa
      { name: "gif", maxCount: 1 }, // Campo para o GIF
    ]),
    EventoCreateValidator,
    EventoCreateController
  );

router.get('/', EventoGetAllController);
router.get('/:id', ValidatorID, EventoGetByIdController);
router.put('/:id', ValidatorID, EventoUpdateController);
router.delete('/:id', ValidatorID, EventoDeleteController);


module.exports = router;