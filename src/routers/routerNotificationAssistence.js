const { Router } = require("express");

const notificationAssCreateController = require("../controllers/NotificationAssistenceControllers/NotificationAssCreateController");
const notificationAssGetAllController = require("../controllers/NotificationAssistenceControllers/NotificationAssGetAllController");

const router = Router();

router.post("/", notificationAssCreateController);
router.get("/", notificationAssGetAllController);

module.exports = router;