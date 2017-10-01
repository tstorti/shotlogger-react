const router = require("express").Router();
const articleRoutes = require("./shotlogs");

// Article routes
router.use("/shotlogs", articleRoutes);
router.use("/players", articleRoutes);
router.use("/leagues", articleRoutes);

module.exports = router;
