require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors'); // Import the cors middleware

const whiteboardRoutes = require('./routes/whiteboard');
const userRoutes = require('./routes/user');

// express app
const app = express();
const server = http.createServer(app);

// Enable CORS for all routes
app.use(cors());

const io = socketIo(server, {
  cors: {
    origin: 'http://localhost:5173', // Replace with the correct frontend URL and port
    methods: ['GET', 'POST', 'DELETE', 'PATCH'],
  },
});

io.on('connection', (socket) => {
  console.log('A user connected');

  socket.on('whiteboard-updated', (data) => {
    // Handle the updated document data and save it to the database.
    // You can also broadcast the changes to other connected clients if needed.
    console.log("Saved changes.");
  });

  socket.on('client-event-name', (data) => {
    console.log(data)
  }); 

  socket.on('disconnect', () => {
    console.log('A user disconnected');
  });
});

app.use(express.json());

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

// routes
app.use('/api/whiteboards', whiteboardRoutes);
app.use('/api/user/', userRoutes);

// connect to db
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    server.listen(process.env.PORT, () => {
      console.log('connected to db & listening on port', process.env.PORT);
    });
  })
  .catch((error) => {
    console.log(error);
  });
