const Discord = require("discord.js")

module.exports = {
    name: "randomnum",
    description: "Donner un nombre aléatoire dans une plage si voulu",
    usage: "randomnum [args[0] num] [args[1] num]",
    enabled: true,
    aliases: [],
    category: "Aléatoire",
    memberPermissions: [],
    botPermissions: [ "SEND_MESSAGES", "EMBED_LINKS" ],
    nsfw: false,
    cooldown: 0,
    ownerOnly: false,

    async execute(client, message, args, data) {
        if (!args[0]) return message.channel.send(`:white_check_mark: **|** Voici un nombre entier aléatoire entre **-5** et **10**: \`${Math.round((-5.5) + Math.random() * 16)}\``)
        if (args[0]) {
            if (args[1]) {
                let min = args[0].replace(',', '.')
                let max = args[1].replace(',', '.')
                if (isNaN(min)) {
                    return message.channel.send(`:x: **|** Le nombre \`${args[0]}\` n'est pas un nombre valide !\n__Exemple__: \`${data.guild.prefix}randomnum integer -5 10\``)
                } else if (isNaN(max)) {
                    return message.channel.send(`:x: **|** Le nombre \`${args[1]}\` n'est pas un nombre valide !\n__Exemple__: \`${data.guild.prefix}randomnum integer -5 10\``)
                }
                return message.channel.send(`:white_check_mark: **|** Voici un nombre entier aléatoire entre **${args[0]}** et **${args[1]}**: \`${Math.round((min - 0.5) + Math.random() * (max - min + 1))}\``)
            }
            let min = args[0].replace(',', '.')
            if (isNaN(min)) {
                return message.channel.send(`:x: **|** Le nombre \`${args[0]}\` n'est pas un nombre valide !\n__Exemple__: \`${data.guild.prefix}randomnum integer -5 10\``)
            }
            return message.channel.send(`:white_check_mark: **|** Voici un nombre entier aléatoire entre **${args[0]}** et **10**: \`${Math.round((min - 0.5) + Math.random() * (10 - min + 1))}\``)
        }
        return message.channel.send(`:white_check_mark: **|** Voici un nombre entier aléatoire entre **-5** et **10**: \`${Math.round((-5.5) + Math.random() * 16)}\``)
    }
}