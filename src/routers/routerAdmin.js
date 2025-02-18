const { Router } = require("express");
const router = Router();
const AdminCreateController = require("../controllers/AdminControllers/AdminCreateController");
const AdminCreateValidator = require("../middlewares/Validators/AdminValidators/AdminCreateValidator");

// Create Admin 
router.post("/", AdminCreateValidator, AdminCreateController);

// getAll Admin
router.get("/");

// getOne Admin
router.get("/:id");

// update Admin
router.put("/:id");

// delete Admin
router.delete("/:id");

module.exports = router;
