const { Router } = require("express");
const router = Router();

const routerUser = require("./routerUser");
const routerDisableds = require("./routerDisabled");
const routerAssistiveTech = require("./routerAssistiveTech");

router.use("/users", routerUser );
router.use("/disableds", routerDisableds);
router.use("/assistivetech", routerAssistiveTech);

module.exports = router;