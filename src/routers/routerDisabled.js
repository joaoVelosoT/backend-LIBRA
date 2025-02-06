const { Router } = require("express");
const DisabledCreateValidator = require("../middlewares/validators/disabledValidators/disabledCreateValidator");
const DisabledCreateController = require("../controllers/DisabledCreateController");
const DisabledGetAllController = require("../controllers/DisabledGetAllController");
const DisabledGetByIdController = require("../controllers/DisabledGetByIdController");

const router = Router();

router.post("/", DisabledCreateValidator, DisabledCreateController);
router.get('/', DisabledGetAllController); 
router.get('/:id', DisabledGetByIdController);
// router.update('/', disabledUpdateController.getAll);
// router.delete('/', disabledDeleteController.getAll);

module.exports = router;