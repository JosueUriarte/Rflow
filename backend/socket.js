module.exports = (io) => {
  console.log('test');
  io.on('connection', (socket) => {
    console.log('A user connected');

    socket.on('document-updated', (data) => {
      // Handle the updated document data and save it to the database.
      // You can also broadcast the changes to other connected clients if needed.
    });

    socket.on('disconnect', () => {
      console.log('A user disconnected');
    });
  });
};