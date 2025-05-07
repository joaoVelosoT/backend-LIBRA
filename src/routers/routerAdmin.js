const { Router } = require("express");
const router = Router();
const multer = require("multer");

// Controladores e validadores de dados
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

// Configurando o tratamento de arquivos pelo banco de dados
const upload = multer({ storage: multer.memoryStorage() });

// Create Admin 
router.post(
    "/",
    upload.single("imagemPerfil"), // Processa o arquivo enviado no campo "imagemPerfil"
    AdminCreateValidator, // Valida os dados
    AdminCreateController // Cria o admin
  );
  
  // rota para adicionar nova foto
  router.post(
    "/:id/addpicture",
    ValidatorID, // Valida o id recebido 
    upload.single("imagemPerfil"), 
    AdminAddPictureValidator, // Valida informações de imagens recebidas
    AdminAddPictureController // controllador para adicionar uma imagem ou atualizar
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