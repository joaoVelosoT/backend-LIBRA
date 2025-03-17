const { Router } = require("express");
const router = Router();
const multer = require("multer");
const AdminCreateController = require("../controllers/AdminControllers/AdminCreateController");
const AdminCreateValidator = require("../middlewares/Validators/AdminValidators/AdminCreateValidator");
const AdminDeleteController = require("../controllers/AdminControllers/AdminDeleteController");
const AdminGetAllController = require("../controllers/AdminControllers/AdminGetAllController");
const AdminGetByIdController = require("../controllers/AdminControllers/AdminGetByIdController");
const AdminUpdateController = require("../controllers/AdminControllers/AdminUpdateController");
const AdminUpdateValidator = require("../middlewares/Validators/AdminValidators/AdminUpdateValidator");
const AdminAddPictureController = require("../controllers/AdminControllers/AdminAddPictureController");
const AdminAddPictureValidator = require("../middlewares/Validators/AdminValidators/AdminAddPictureValidator")

const ValidatorID = require("../middlewares/Validators/ValidatorID");
const upload = multer({ storage: multer.memoryStorage() });


// Create Admin 
router.post(
    "/",
    upload.single("imagemPerfil"), // Processa o arquivo enviado no campo "imagemPerfil"
    AdminCreateValidator, // Valida os dados
    AdminCreateController // Cria o admin
  );
  

  router.post(
    "/:id/addpicture",
    ValidatorID,
    upload.single("imagemPerfil"),
    AdminAddPictureValidator, 
    AdminAddPictureController
  );

// getAll Admin
router.get("/", AdminGetAllController);

// getOne Admin
router.get("/:id", ValidatorID, AdminGetByIdController);

// update Admin
router.patch("/:id", ValidatorID, AdminUpdateValidator, AdminUpdateController);

// delete Admin
router.delete("/:id", ValidatorID, AdminDeleteController);

module.exports = router;