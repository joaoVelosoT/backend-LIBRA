const { Router } = require("express");
const router = Router();

const routerUser = require("./routerUser");
const routerDisableds = require("./routerDisabled");
const routerTypesDisableds = require("./routerTypeDisabled");
const routerAuth = require("./routerAuth");
const routerUsersDisabled = require("./routerUsersDisabled");
const routerAdmin = require("./routerAdmin");
const routerEventos = require("./routerEvento");
const routerNotification = require("./routerNotificarion");
const routerRequestedBook = require("./routerRequestedBook");
const routerNotificationAssistence = require("./routerNotificationAssistence");
const bookRouter = require("./routerBook");

router.use("/books", bookRouter);
router.use("/users", routerUser);
router.use("/admin", routerAdmin);
router.use("/disableds", routerDisableds);
router.use("/typesdisabled", routerTypesDisableds);
router.use("/auth", routerAuth);
router.use("/usersdisabled", routerUsersDisabled);
router.use("/evento", routerEventos);
router.use("/notifications", routerNotification);
router.use("/requestedBooks", routerRequestedBook);
router.use("/notificationAss", routerNotificationAssistence);

module.exports = router;
