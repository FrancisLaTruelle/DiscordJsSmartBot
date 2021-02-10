const Discord = require("discord.js")

module.exports.uniqueID = async function(client, message, data){
    return Math.floor(Math.random() * Date.now())
}