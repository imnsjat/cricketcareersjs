const Sequelize = require('sequelize');
const sequelize = require('../util/database');

const Player = sequelize.define('player' , {
    id : {type : Sequelize.INTEGER ,autoIncrement:true , allowNull:false , primaryKey : true},
    name : Sequelize.STRING,
    age : Sequelize.INTEGER  ,
    photourl :  Sequelize.STRING,
    birthplace : Sequelize.STRING ,
    matches : Sequelize.INTEGER ,
    runs : Sequelize.INTEGER ,
    fifties : Sequelize.INTEGER ,
    centuries : Sequelize.INTEGER ,
    wickets : Sequelize.INTEGER ,
    average : Sequelize.INTEGER ,
    description : Sequelize.TEXT 
});
Player.findById = async function (id) {
    return await this.findOne({ where: { id } });
};
module.exports = Player;