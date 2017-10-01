const router = require("express").Router();
const shotlogsController = require("../../controllers/shotlogsController");

// Matches with "/api/shotlogs"
router.route("/")
  // .get(shotlogsController.findAll)
  // .post(shotlogsController.create);

// Matches with "/api/shotlogs/:id"
router
  // .route("/:id")
  // .delete(shotlogsController.remove);

module.exports = router;
