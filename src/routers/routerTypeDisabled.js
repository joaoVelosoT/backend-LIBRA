const { Router } = require("express");
const router = Router();

const validatorNameTypeDisabled = require("../middlewares/validators/TypesDisabledValidators/validatorNameTypeDisabled.js")

const typesDisableCreateControllers = require("../controllers/typesDisableControllers/typesDisableCreateControllers.js");
const typesDisableGetOneControllers = require("../controllers/typesDisableControllers/TypesDisabledGetOneControllers.js");
const typesDisableGetAllControllers = require("../controllers/TypesDisableControllers/typesDisableGetAllControllers.js");
const typesDisabledUpdateController = require("../controllers/TypesDisableControllers/typesDisableUpdateController.js");
const typesDisableDeleteControllers = require("../controllers/TypesDisableControllers/typesDisabledDeleteControllers.js");
const AuthAdmin = require("../utils/isAdmin"); 


// typesDisable será uma funcionalidade com acesso restrito ao admin


// Create TypeDisable
router.post("/", AuthAdmin, validatorNameTypeDisabled, typesDisableCreateControllers.create);

// // getAll TypesDisable
router.get("/", AuthAdmin, typesDisableGetAllControllers.getAll);

// // getOne TypeDisable
router.get("/:name", AuthAdmin, typesDisableGetOneControllers.getOneByName);

// // update TypeDisable
router.patch("/:name", AuthAdmin, validatorNameTypeDisabled, typesDisabledUpdateController.update);

// // delete TypeDisable
router.delete("/:name", AuthAdmin, typesDisableDeleteControllers.delete);

module.exports = router;
