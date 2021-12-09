const router = require("express").Router();
const leaguesController = require("../../controllers/leaguesController");

// Matches with "/api/leagues"
router.route("/")
  .post(leaguesController.create);
  
// Matches with "/api/leagues/login"
router.route("/authenticate")
  .post(leaguesController.getLeague);

module.exports = router;
