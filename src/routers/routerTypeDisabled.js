const { Router } = require("express");
const router = Router();

const validatorNameTypeDisabled = require("../middlewares/validators/TypesDisabledValidators/validatorNameTypeDisabled.js")

const typesDisableCreateControllers = require("../controllers/typesDisableControllers/typesDisableCreateController.js");
const typesDisableGetOneControllers = require("../controllers/typesDisableControllers/TypesDisabledGetOneControllers.js");
const typesDisableGetAllControllers = require("../controllers/TypesDisableControllers/typesDisableGetAllControllers.js");
const typesDisabledUpdateController = require("../controllers/TypesDisableControllers/typesDisableUpdateController.js");


// typesDisable será uma funcionalidade com acesso restrito ao admin


// Create TypeDisable
router.post("/", validatorNameTypeDisabled, typesDisableCreateControllers.create);

// // getAll TypesDisable
router.get("/", typesDisableGetAllControllers.getAll);

// // getOne TypeDisable
router.get("/:name", typesDisableGetOneControllers.getOneByName);

// // update TypeDisable
router.put("/:name", validatorNameTypeDisabled, typesDisabledUpdateController.update);

// // delete TypeDisable
// router.delete("/:id", typesDisableControllers);

module.exports = router;
