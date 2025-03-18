const { Router } = require("express");

const EventoCreateController = require("../controllers/EventosControllers/EventoCreateController");
const EventoGetAllController = require("../controllers/EventosControllers/EventoGetAllController");
const EventoGetByIdController = require("../controllers/EventosControllers/EventoGetByIdController");
const EventoUpdateController = require("../controllers/EventosControllers/EventoUpdateController");
const EventoDeleteController = require("../controllers/EventosControllers/EventoDeleteController");
const ValidatorID = require("../middlewares/Validators/ValidatorID");


const router = Router();

router.post("/", EventoCreateController);
router.get('/', EventoGetAllController);
router.get('/:id', ValidatorID, EventoGetByIdController);
router.put('/:id', ValidatorID, EventoUpdateController);
router.delete('/:id', ValidatorID, EventoDeleteController);


module.exports = router;