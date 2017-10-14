const router = require("express").Router();
const shotlogsController = require("../../controllers/shotlogsController");

// Matches with "/api/shotlogs"
router.route("/")
    

// Matches with "/api/shotlogs/:id"
router.route("/:id")
.get(shotlogsController.getAllShots);

module.exports = router;
