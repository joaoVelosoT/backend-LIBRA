const { Router } = require("express");
const DisabledCreateValidator = require("../middlewares/validators/disabledValidators/DisabledCreateValidator");
const DisabledUpdateValidator = require("../middlewares/validators/disabledValidators/DisabledUpdateValidator");
const DisabledCreateController = require("../controllers/DisabledsController/DisabledCreateController");
const DisabledGetAllController = require("../controllers/DisabledsController/DisabledGetAllController");
const DisabledGetByIdController = require("../controllers/DisabledsController/DisabledGetByIdController");
const DisabledUpdateController = require("../controllers/DisabledsController/DisabledUpdateController");
const DisabledDeleteController = require("../controllers/DisabledsController/DisabledDeleteController");
const DisabledGetByTypeController = require("../controllers/DisabledsController/DisabledGetDisabledByType")
const AuthAdmin = require("../utils/isAdmin"); 


const router = Router();

router.post("/", AuthAdmin, DisabledCreateValidator, DisabledCreateController);
router.get('/', AuthAdmin, DisabledGetAllController);
router.get('/:id', AuthAdmin, DisabledGetByIdController);
router.get("/type/:id", DisabledGetByTypeController);
router.put("/:id", AuthAdmin, DisabledUpdateValidator, DisabledUpdateController);
router.delete('/:id', AuthAdmin, DisabledDeleteController);

module.exports = router;