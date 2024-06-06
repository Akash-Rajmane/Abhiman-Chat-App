const Sequelize = require('sequelize');
const sequelize = require("../utils/database");


const User = sequelize.define('User', {
    userId: { type: Sequelize.STRING, unique: true, allowNull: false, primaryKey: true },
    deviceId: {type: Sequelize.STRING, unique: true, allowNull: false},
    name: {type: Sequelize.STRING, unique: true, allowNull: false},
    phone: {type: Sequelize.STRING, unique: true, allowNull: false},
    availCoins: {type: Sequelize.INTEGER, defaultValue: 0},
    isPrime: {type: Sequelize.BOOLEAN, defaultValue: false},
    password: {type: Sequelize.STRING, allowNull: false},
    freeJoin: { type: Sequelize.BOOLEAN, allowNull:false, defaultValue: true } 
});


module.exports = User;