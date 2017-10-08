const router = require("express").Router();
const leagueRoutes = require("./leagues");
const playerRoutes = require("./players");
const shotlogRoutes = require("./shotlogs");

// Article routes
router.use("/shotlogs", shotlogRoutes);
router.use("/players", playerRoutes);
router.use("/leagues", leagueRoutes);

module.exports = router;
