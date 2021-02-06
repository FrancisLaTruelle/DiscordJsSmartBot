const Discord = require("discord.js")

module.exports = {
    name: "function",
    description: "Gérer des fonctions",
    usage: "function <add/remove/list> [function]",
    enabled: true,
    aliases: [],
    category: "Utiles",
    memberPermissions: [],
    botPermissions: [ "SEND_MESSAGES", "EMBED_LINKS" ],
    nsfw: false,
    cooldown: 0,
    ownerOnly: false,

    async execute(client, message, args, data) {
        if (!args[0]) return message.channel.send(`:x: **|** Vous devez indiquer add/remove/list`)  // \`
        if (args[0] === "add") {

        } else if (args[0] === "remove") {

        } else if (args[0] === "list") {
            
        }
    }
}