const Sequelize = require('sequelize');
const sequelize = require("../utils/database");


const ChatRoom = sequelize.define('ChatRoom', {
  roomId: { type: Sequelize.STRING, allowNull: false, primaryKey: true },
  name: { type: Sequelize.STRING, allowNull: false },
  capacity: { type: Sequelize.INTEGER, allowNull: false, defaultValue: 0 },
  password: { type: Sequelize.STRING, allowNull: false },
  members: { type: Sequelize.JSON, allowNull:false, defaultValue: [] } 
});

module.exports = ChatRoom;