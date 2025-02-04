const { Router } = require("express");
const router = Router();

const typesDisable = require("./routerTypeDisabled")
const routerAssistiveTech = require("./routerAssistiveTech");
const routerUser = require("./routerUser")

router.use("/users", routerUser);
router.use("/Typesdisabled", typesDisable);
router.use("/assistivetech", routerAssistiveTech);

module.exports = router;
