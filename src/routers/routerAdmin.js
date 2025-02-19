const { Router } = require("express");
const router = Router();
const AdminCreateController = require("../controllers/AdminControllers/AdminCreateController");
const AdminCreateValidator = require("../middlewares/Validators/AdminValidators/AdminCreateValidator");
const AdminDeleteController = require("../controllers/AdminControllers/AdminDeleteController");
const ValidatorID = require("../middlewares/Validators/ValidatorID");

// Create Admin 
router.post("/", AdminCreateValidator, AdminCreateController);

// getAll Admin
router.get("/");

// getOne Admin
router.get("/:id", ValidatorID,);

// update Admin
router.put("/:id", ValidatorID,);

// delete Admin
router.delete("/:id", ValidatorID, AdminDeleteController, AdminDeleteController);

module.exports = router;
