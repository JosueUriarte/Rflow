const Whiteboard = require("../models/whiteboardModel");
const mongoose = require("mongoose");

// get all whiteboards
const getWhiteboards = async (req, res) => {
  // can put a property to limit searchers
  const whiteboards = await Whiteboard.find({}).sort({ createdAt: -1 });
  res.status(200).json(whiteboards);
};

// get a single whiteboard
const getWhiteboard = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such whiteboard" });
  }

  const whiteboard = await Whiteboard.findById(id);

  if (!whiteboard) {
    return res.status(404).json({ error: "whiteboard not found" });
  }

  res.status(200).json(whiteboard);
};

// crea te a new whiteboard

const createWhiteabord = async (req, res) => {
  const { title, nodes, edges } = req.body;

  let emptyFields = [];

  if (!title) {
    emptyFields.push("title");
  }
  if (!nodes) {
    emptyFields.push("nodes");
  }
  if (!edges) {
    emptyFields.push("edges");
  }
  if (emptyFields.length > 0) {
    return res
      .status(400)
      .json({ error: "Please fill in all fields", emptyFields });
  }

  // add doc to db
  try {
    const user_id = req.user._id;
    const whiteboard = await Whiteboard.create({ title, nodes, edges, user_id });
    res.status(200).json(whiteboard);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// delete a whiteboard
const deleteWhiteboard = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such whiteboard" });
  }

  const whiteboard = await Whiteboard.findOneAndDelete({ _id: id });

  if (!whiteboard) {
    return res.status(404).json({ error: "No such whiteboard" });
  }

  res.status(200).json(whiteboard);
};

// update a new whiteboard

const updateWhiteboard = async (req, res) => {
  const { id } = req.params;
  console.log('ran this shit');
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such whiteboard" });
  }

  const whiteboard = await Whiteboard.findOneAndUpdate(
    { _id: id },
    {
      ...req.body,
    }
  );

  if (!whiteboard) {
    return res.status(404).json({ error: "No such whiteboard" });
  }

  res.status(200).json(whiteboard);
};

module.exports = {
  getWhiteboard,
  getWhiteboards,
  createWhiteabord,
  deleteWhiteboard,
  updateWhiteboard,
};
