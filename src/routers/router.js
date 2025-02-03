const { Router } = require("express");
const router = Router();
const routerUser = require("./routerUser");

router.use("/users", routerUser);

module.exports = router;
