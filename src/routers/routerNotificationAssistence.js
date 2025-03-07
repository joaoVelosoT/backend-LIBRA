const { Router } = require("express");

const notificationAssCreateController = require("../controllers/NotificationAssistenceControllers/NotificationAssCreateController");
const notificationAssGetAllController = require("../controllers/NotificationAssistenceControllers/NotificationAssGetAllController");
const notificationAssGetOneController = require("../controllers/NotificationAssistenceControllers/NotificationAssGetOneController");
const notificationAssUpdateController = require("../controllers/NotificationAssistenceControllers/NotificationAssUpdateController");
const notificationAssDeleteController = require("../controllers/NotificationAssistenceControllers/NotificationAssDeleteController");

const router = Router();


router.post("/", notificationAssCreateController);
router.get("/", notificationAssGetAllController);
// router.get("/:id", notificationAssGetOneController);
// router.put("/:id", notificationAssUpdateController);
// router.delete("/:id", notificationAssDeleteController);



module.exports = router;