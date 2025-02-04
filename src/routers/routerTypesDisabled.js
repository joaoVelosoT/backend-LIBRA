const { Router } = require("express");
const router = Router();

const typesDisableControllers = require("../controllers/TypesDisableControllers/TypesDisabledControllers.js")

// typesDisable será uma funcionalidade com acesso restrito ao admin

// Create TypeDisable
router.post("/", typesDisableControllers);

// getAll TypesDisable
router.get("/", typesDisableControllers);

// getOne TypeDisable
router.get("/:id", typesDisableControllers);

// update TypeDisable
router.put("/:id", typesDisableControllers);

// delete TypeDisable
router.delete("/:id", typesDisableControllers);

module.exports = router;
