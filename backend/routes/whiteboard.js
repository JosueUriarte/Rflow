const express = require("express");
const {
  getWhiteboard,
  getWhiteboards,
  createWhiteabord,
  deleteWhiteboard,
  updateWhiteboard,
} = require("../controllers/whiteboardController");
const router = express.Router();

// GET all whiteboards
router.get("/", getWhiteboards);

// GET a single whiteboard
router.get("/:id", getWhiteboard);

//POST a new whiteboard
router.post("/", createWhiteabord);

//Delete a whiteboard
router.delete("/:id", deleteWhiteboard);

// UPDATE a whiteboard
router.patch("/:id", updateWhiteboard);

module.exports = router;
