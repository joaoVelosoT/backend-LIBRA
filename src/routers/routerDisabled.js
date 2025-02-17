const { Router } = require("express");
const DisabledCreateValidator = require("../middlewares/validators/disabledValidators/DisabledCreateValidator");
const DisabledUpdateValidator = require("../middlewares/validators/disabledValidators/DisabledUpdateValidator");
const DisabledCreateController = require("../controllers/DisabledsController/DisabledCreateController");
const DisabledGetAllController = require("../controllers/DisabledsController/DisabledGetAllController");
const DisabledGetByIdController = require("../controllers/DisabledsController/DisabledGetByIdController");
const DisabledUpdateController = require("../controllers/DisabledsController/DisabledUpdateController");
const DisabledDeleteController = require("../controllers/DisabledsController/DisabledDeleteController");
const DisabledGetByTypeController = require("../controllers/DisabledsController/DisabledGetDisabledByType")

const router = Router();

router.post("/", DisabledCreateValidator, DisabledCreateController);
router.get('/', DisabledGetAllController);
router.get('/:id', DisabledGetByIdController);
router.get("/type/:id", DisabledGetByTypeController);
router.put("/:id", DisabledUpdateValidator, DisabledUpdateController);
router.delete('/:id', DisabledDeleteController);

module.exports = router;