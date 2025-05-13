const { Router } = require("express");
const DisabledCreateValidator = require("../middlewares/Validators/disabledValidators/disabledCreateValidator");
const DisabledUpdateValidator = require("../middlewares/Validators/disabledValidators/DisabledUpdateValidator");
const DisabledCreateController = require("../controllers/DisabledsController/DisabledCreateController");
const DisabledGetAllController = require("../controllers/DisabledsController/DisabledGetAllController");
const DisabledGetByIdController = require("../controllers/DisabledsController/DisabledGetByIdController");
const DisabledUpdateController = require("../controllers/DisabledsController/DisabledUpdateController");
const DisabledDeleteController = require("../controllers/DisabledsController/DisabledDeleteController");
const DisabledGetByTypeController = require("../controllers/DisabledsController/DisabledGetDisabledByType")
const ValidatorID = require("../middlewares/Validators/ValidatorID");
const AuthAdmin = require("../utils/isAdmin");



const router = Router();

router.post("/", /*AuthAdmin,*/ DisabledCreateValidator, DisabledCreateController);
router.get('/', AuthAdmin, DisabledGetAllController);
router.get('/:id', AuthAdmin, DisabledGetByIdController);
router.get("/type/:id", ValidatorID, DisabledGetByTypeController);
router.put("/:id", ValidatorID, AuthAdmin, DisabledUpdateValidator, DisabledUpdateController);
router.delete('/:id', ValidatorID, AuthAdmin, DisabledDeleteController);

module.exports = router;