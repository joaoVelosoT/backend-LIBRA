const { Router } = require("express");
const router = Router();

const validatorTypeDisabled = require("../middlewares/validators/TypesDisabledValidators/validatorTypeDisabled.js")

const typesDisableControllers = require("../controllers/TypesDisableControllers/TypesDisabledControllers.js");

// typesDisable será uma funcionalidade com acesso restrito ao admin

// Create TypeDisable
router.post("/", validatorTypeDisabled, typesDisableControllers.create);

// // getAll TypesDisable
// router.get("/", typesDisableControllers);

// // getOne TypeDisable
router.get("/:name", typesDisableControllers.getOneByName);

// // update TypeDisable
// router.put("/:id", typesDisableControllers);

// // delete TypeDisable
// router.delete("/:id", typesDisableControllers);

module.exports = router;
