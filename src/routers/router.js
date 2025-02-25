const { Router } = require("express");
const router = Router();

const routerUser = require("./routerUser");
const routerDisableds = require("./routerDisabled");
const routerAssistiveTech = require("./routerAssistiveTech");
const routerTypesDisableds = require("./routerTypeDisabled");
const routerAuth = require("./routerAuth");
const routerUsersDisabled = require("./routerUsersDisabled");
const routerAdmin = require("./routerAdmin");
const routerEventos = require("./routerEvento");
const routerNotification = require("./routerNotificarion");


router.use("/users", routerUser);
router.use("/admin", routerAdmin);
router.use("/disableds", routerDisableds);
router.use("/assistivetech", routerAssistiveTech);
router.use("/typesdisabled", routerTypesDisableds);
router.use("/auth", routerAuth);
router.use("/usersdisabled", routerUsersDisabled);
router.use("/evento", routerEventos);
router.use("/notifications", routerNotification);
module.exports = router;
