const Sequelize = require('sequelize');
const sequelize = require("../utils/database");


const Message = sequelize.define('Message', {
    id: { type: Sequelize.INTEGER, autoIncrement: true, allowNull: false, primaryKey: true },
    content: { type:Sequelize.TEXT, allowNull: false },
    senderId: { type:Sequelize.STRING, allowNull:false },
    roomId: { type:Sequelize.STRING, allowNull:false }
});


module.exports = Message;