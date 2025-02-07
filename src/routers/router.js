const { Router } = require("express");
const router = Router();

const routerUser = require("./routerUser");
const routerDisableds = require("./routerDisabled");
const routerAssistiveTech = require("./routerAssistiveTech");
const routerTypesDisableds = require("./routerTypeDisabled");
const routerAuth = require("./routerAuth");

router.use("/users", routerUser);
router.use("/disableds", routerDisableds);
router.use("/assistivetech", routerAssistiveTech);
router.use("/typesdisabled", routerTypesDisableds);
router.use("/auth", routerAuth);

module.exports = router;