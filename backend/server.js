require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const http = require("http");
const axios = require("axios");
const socketIo = require("socket.io");
const cors = require("cors"); // Import the cors middleware

const whiteboardRoutes = require("./routes/whiteboard");
const userRoutes = require("./routes/user");

// express app
const app = express();
const server = http.createServer(app);

// Enable CORS for all routes
app.use(cors());

const io = socketIo(server, {
  cors: {
    origin: "http://localhost:5173", // Replace with the correct frontend URL and port
    methods: ["GET", "POST", "DELETE", "PATCH"],
  },
});

io.on("connection", (socket) => {
  console.log("A user connected");

  socket.on("whiteboard-updated", async (data) => {
    try {
      console.log("data: " + JSON.stringify(data));

      let user = data.user;
      let newData = { title: title, nodes: nodes, edges: edges };

      // Make a POST request to your API endpoint to save the updated data
      let address = "http://localhost:" + process.env.PORT + "/api/whiteboards";
      const response = await axios.patch(address, newData);
    } catch (error) {
      console.log("error: " + error);
    }

    console.log("Saved changes.");
  });

  socket.on("client-event-name", (data) => {
    console.log(data);
  });

  socket.on("disconnect", () => {
    console.log("A user disconnected");
  });
});

app.use(express.json());

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

// routes
app.use("/api/whiteboards", whiteboardRoutes);
app.use("/api/user/", userRoutes);

// connect to db
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    server.listen(process.env.PORT, () => {
      console.log("connected to db & listening on port", process.env.PORT);
    });
  })
  .catch((error) => {
    console.log(error);
  });
