const { Router } = require("express");

const EventoCreateController = require("../controllers/EventosControllers/EventoCreateController");
const EventoGetAllController = require("../controllers/EventosControllers/EventoGetAllController");
const EventoGetByIdController = require("../controllers/EventosControllers/EventoGetByIdController");
const EventoUpdateController = require("../controllers/EventosControllers/EventoUpdateController");
const EventoDeleteController = require("../controllers/EventosControllers/EventoDeleteController");

const router = Router();

router.post("/", EventoCreateController);
router.get('/', EventoGetAllController);
router.get('/:id', EventoGetByIdController);
router.put('/:id', EventoUpdateController);
router.delete('/:id', EventoDeleteController);


module.exports = router;