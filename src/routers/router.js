const { Router } = require("express");
const router = Router();

const routerUser = require("./routerUser");
const routerDisableds = require("./routerDisabled");
const routerTypesDisableds = require("./routerTypeDisabled");
const routerAuth = require("./routerAuth");
const routerUsersDisabled = require("./routerUsersDisabled");
const routerAdmin = require("./routerAdmin");
const routerEventos = require("./routerEvento");
const routerNotification = require("./routerNotification.js");
const routerRequestedBook = require("./routerRequestedBook");
const routerNotificationAssistence = require("./routerNotificationAssistence");
const bookRouter = require("./routerBook");
const routerUploads = require("./routerUploads.js")
const ebookRouter = require("./routerEbook.js")
const audiobookRouter = require("./routerAudioBook.js")
const BookSearchController = require("../controllers/BooksControllers/BookSearchController")
const brailleRoutes = require('./routerBraille.js');
const epubRoutes = require("./routerEpub.js")
const aiRoutes = require("./RouterIa.js");


router.use("/api/ia", aiRoutes);
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

// Rota de query para buscas
router.use("/search", BookSearchController);

router.use('/converte', brailleRoutes);
router.use('/generate-epub', epubRoutes)


module.exports = router;
