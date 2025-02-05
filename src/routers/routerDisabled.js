const { Router } = require("express");
const DisabledCreateValidator = require("../middlewares/validators/disabledValidators/disabledCreateValidator");
const DisabledCreateController = require("../controllers/DisabledCreateController");
const DisabledGetAllController = require("../controllers/DisabledGetAllController");

const router = Router();

router.post("/", DisabledCreateValidator, DisabledCreateController);
 router.get('/', DisabledGetAllController); 
// router.get('/', disabledGetByIdController.getAll);
// router.update('/', disabledUpdateController.getAll);
// router.delete('/', disabledDeleteController.getAll);

module.exports = router;