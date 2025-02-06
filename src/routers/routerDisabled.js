const { Router } = require("express");
const DisabledCreateValidator = require("../middlewares/validators/disabledValidators/DisabledCreateValidator");
const DisabledUpdateValidator = require("../middlewares/validators/disabledValidators/DisabledUpdateValidator");
const DisabledCreateController = require("../controllers/DisabledCreateController");
const DisabledGetAllController = require("../controllers/DisabledGetAllController");
const DisabledGetByIdController = require("../controllers/DisabledGetByIdController");
const DisabledUpdateController = require("../controllers/DisabledUpdateController");

const router = Router();

router.post("/", DisabledCreateValidator, DisabledCreateController);
router.get('/', DisabledGetAllController); 
router.get('/:id', DisabledGetByIdController);
router.put("/:id", DisabledUpdateValidator, DisabledUpdateController);
// router.delete('/', disabledDeleteController.getAll);

module.exports = router;