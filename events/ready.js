const Discord = require("discord.js")
const colors = require('colors')
const mongo = require('../database/mongoDB')

module.exports = client => {
    client.log('loaded', `${client.user.username} est pret à être utilisé !`)
    client.user.setActivity("s!help", { type: 5 })

}