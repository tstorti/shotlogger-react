const router = require("express").Router();
const leaguesController = require("../../controllers/leaguesController");

// Matches with "/api/leagues"
router.route("/")
  .get(leaguesController.findAll)
  .post(leaguesController.create);
  
// Matches with "/api/leagues/:id"
router.route("/:id")
   .get(leaguesController.getPlayers);

module.exports = router;
