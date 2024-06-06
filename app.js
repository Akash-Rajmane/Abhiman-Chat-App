const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const http = require('http');
const sequelize = require("./utils/database");
const {Server} = require('socket.io');

const userRoutes = require('./routes/user');
const roomRoutes = require('./routes/room');
const subscriptionRoutes = require('./routes/subscription');
const messageRoutes = require('./routes/message');
const friendRequestRoutes = require('./routes/friendrequest');




const app = express();
app.use(cors());
const server = http.createServer(app);

const io = new Server(server, {
  pingTimeout: 60000,
  cors: {
    origin: process.env.CLIENT_ENDPOINT || '*',
    methods: ['GET', 'POST']
  },
});
app.set('io', io);

app.use(bodyParser.json());



app.use('/api', userRoutes);
app.use('/api', roomRoutes);
app.use('/api', subscriptionRoutes);
app.use('/api', messageRoutes);
app.use('/api', friendRequestRoutes);


app.use((err, req, res, next) => {
    res.status(err.status || 500).json({ error: err.message || 'Internal Server Error' });
  });


io.on('connection', (socket) => {
  console.log(`User connected ${socket.id}`);

    
    socket.on('joinRoom', (roomId) => {
      socket.join(roomId);
      console.log(`Client joined room ${roomId}`);
    });
  
    socket.on('disconnect', () => {
      console.log('Client disconnected');
    });
});
  
  const PORT = process.env.PORT || 3000;
  sequelize.sync().then(() => {
    server.listen(PORT, () => console.log(`Server running on port ${PORT}`))
  });
  
  
