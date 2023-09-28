const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const whiteboardSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    nodes: {
      type: Array,
      required: true,
    },
    edges: {
      type: Array,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Whiteboard", whiteboardSchema);
