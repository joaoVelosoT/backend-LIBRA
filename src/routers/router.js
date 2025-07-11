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
const routerUploads = require("./routerUploads.js")
const ebookRouter = require("./routerEbook.js")
const audiobookRouter = require("./routerAudioBook.js")
const BookSearchController = require("../controllers/BooksControllers/BookSearchController")


router.use("/ebook", ebookRouter);
router.use("/audiobook", audiobookRouter);
router.use("/books", bookRouter);
router.use('/api', routerUploads);
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
router.use("/search", BookSearchController);

module.exports = router;
