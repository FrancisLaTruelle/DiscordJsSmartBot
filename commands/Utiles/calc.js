const Discord = require('discord.js')

module.exports = {

    name: "calc",
    description: "Donner le résultat d'un calcul",
    usage: "calc <calcul>",
    enabled: true,
    aliases: ["eval", "result"],
    category: "Utiles",
    memberPermissions: [ "ADMINISTRATOR" ],
    botPermissions: [ "SEND_MESSAGES", "EMBED_LINKS" ],
    nsfw: false,
    ownerOnly: false,
    cooldown: 5000,

    async execute(client, message, args, data) {

        if (!args[0]) return message.channel.send(`:x: **|** Vous devez proposer un calcul !\n__Exemple__: \`${data.guild.prefix}calc (4+4)*6/2\``)
        try {
            let result = eval(args.join(' '))
            return message.channel.send(`:white_check_mark: **|** Le résultat pour \`${args.join(' ')}\` est **${result}** !`)
        } catch (e) {
            if (e instanceof SyntaxError) {
                return message.channel.send(`:x: **|** Votre calcul n'est pas correcte !\n__Exemple__: \`${data.guild.prefix}calc (4+4)*6/2\``)
            }
        }
    }

}