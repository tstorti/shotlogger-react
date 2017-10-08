const router = require("express").Router();
const leaguesController = require("../../controllers/leaguesController");

// Matches with "/api/leagues"
router.route("/")
  // .get(shotlogsController.findAll)
  .post(leaguesController.create);

// Matches with "/api/shotlogs/:id"
router
  // .route("/:id")
  // .delete(shotlogsController.remove);

module.exports = router;
