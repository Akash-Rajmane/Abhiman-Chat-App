const Sequelize = require('sequelize');
const sequelize = require("../utils/database");


const FriendRequest = sequelize.define('FriendRequest', {
  id: { type: Sequelize.INTEGER, autoIncrement: true, allowNull: false, primaryKey: true },
  senderId: { type: Sequelize.STRING, allowNull: false },
  receiverId: { type: Sequelize.STRING, allowNull: false },
  status: { type: Sequelize.STRING, allowNull: false, defaultValue: 'pending' }
});


module.exports = FriendRequest;