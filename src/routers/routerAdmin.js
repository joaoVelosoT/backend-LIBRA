const { Router } = require("express");
const router = Router();
const AdminCreateController = require("../controllers/AdminControllers/AdminCreateController");
const AdminCreateValidator = require("../middlewares/Validators/AdminValidators/AdminCreateValidator");
const AdminDeleteController = require("../controllers/AdminControllers/AdminDeleteController");
const AdminGetAllController = require("../controllers/AdminControllers/AdminGetAllController");
const AdminGetByIdController = require("../controllers/AdminControllers/AdminGetByIdController");
const AdminUpdateController = require("../controllers/AdminControllers/AdminUpdateController");
const AdminUpdateValidator = require("../middlewares/Validators/AdminValidators/AdminUpdateValidator");
const ValidatorID = require("../middlewares/Validators/ValidatorID");

// Create Admin 
router.post("/", AdminCreateValidator, AdminCreateController);

// getAll Admin
router.get("/", AdminGetAllController);

// getOne Admin
router.get("/:id", ValidatorID, AdminGetByIdController);

// delete Admin
router.delete("/:id", ValidatorID, AdminDeleteController, AdminDeleteController);

// update Admin
router.patch("/:id", ValidatorID, AdminUpdateValidator, AdminUpdateController);


module.exports = router;
