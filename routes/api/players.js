const router = require("express").Router();
const playersController = require("../../controllers/playersController");

// Matches with "/api/players"
router.route("/")
  .post(playersController.create);

// Matches with "/api/players/:id"
router.route("/:id")

module.exports = router;
