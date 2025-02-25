const { Router } = require("express");

const EventoCreateController = require("../controllers/EventosControllers/EventoCreateController");
const EventoGetAllController = require("../controllers/EventosControllers/EventoGetAllController");

const router = Router();

router.post("/", EventoCreateController);
router.get('/', EventoGetAllController);
// router.get('/:id', AuthAdmin, DisabledGetByIdController);
// router.get("/type/:id", ValidatorID,  DisabledGetByTypeController);
// router.put("/:id", ValidatorID, AuthAdmin, DisabledUpdateValidator, DisabledUpdateController);
// router.delete('/:id', ValidatorID, AuthAdmin, DisabledDeleteController);

module.exports = router;