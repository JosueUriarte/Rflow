const express = require("express");
const {
  getWhiteboard,
  getWhiteboards,
  createWhiteabord,
  deleteWhiteboard,
  updateWhiteboard,
} = require("../controllers/whiteboardController");
const router = express.Router();

// GET all workouts
router.get("/", getWhiteboards);

// GET a single workout
router.get("/:id", getWhiteboard);

//POST a new workout
router.post("/", createWhiteabord);

//Delete a workout
router.delete("/:id", deleteWhiteboard);

// UPDATE a workout
router.patch("/:id", updateWhiteboard);

module.exports = router;
