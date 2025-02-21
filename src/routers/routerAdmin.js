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
const AdminAddPicture = require("../controllers/AdminControllers/AdminAddPictureController");

// Create Admin 
router.post("/", AdminCreateValidator, AdminCreateController);

// getAll Admin
router.get("/", AdminGetAllController);

// getOne Admin
router.get("/:id", ValidatorID, AdminGetByIdController);

// update Admin
router.patch("/:id", ValidatorID, AdminUpdateValidator, AdminUpdateController);

// delete Admin
router.delete("/:id", ValidatorID, AdminDeleteController, AdminDeleteController);

// adicionar foto do admin em perfil já criado -> enviar id do admin
router.post("/image/:id", ValidatorID, AdminAddPicture);


module.exports = router;
