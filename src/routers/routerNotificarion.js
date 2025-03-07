const { Router } = require("express");
const NotificationCreateController = require("../controllers/NotificationControllers/NotificationCreateController");
const NotificationGetAllController = require("../controllers/NotificationControllers/NotificationGetAllController");
const NotificationDeleteController = require("../controllers/NotificationControllers/NotificationDeleteController");

const NotificationRequestedBookGetAllController = require("../controllers/NotificationRequestedBookControllers/NotificationRequestedBookGetAllController");

const NotificationCreateValidator = require("../middlewares/Validators/NotificationValidators/NotificationCreateValidator");
const ValidatorID = require("../middlewares/Validators/ValidatorID")

const router = Router();

// Criar notificação
router.post("/", NotificationCreateValidator, NotificationCreateController);

// Listar todas as notificações
router.get("/", NotificationGetAllController);

// Deletar notificação
router.delete("/:id", ValidatorID, NotificationDeleteController);

// Listar todas as notificações de livro
router.get("/books", NotificationRequestedBookGetAllController);


module.exports = router;