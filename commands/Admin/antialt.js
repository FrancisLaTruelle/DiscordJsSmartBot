const Discord = require('discord.js')

module.exports = {

    name: "antialt",
    description: "Interdisez l'accès à votre serveur aux membres avec un compte trop récent (-24h)",
    usage: "antialt [true/false]",
    enabled: true,
    aliases: [],
    category: "Administrateur",
    memberPermissions: [ "ADMINISTRATOR" ],
    botPermissions: [ "SEND_MESSAGES", "EMBED_LINKS" ],
    nsfw: false,
    ownerOnly: false,
    cooldown: 5000,

    async execute(client, message, args, data) {

        if (!args[0]) {
            if (data.guild.antiAlt === true) {
                return message.channel.send(`:green_circle: **|** La protection contre les comptes trop récents sur ${message.guild.name} est \`activée\` !\nPour désactiver cette protection, utilisez la commande \`` + data.guild.prefix + `antialt off\``)
            } else {
                return message.channel.send(`:red_circle: **|** La protection contre les comptes trop récents sur ${message.guild.name} est \`désactivée\` !\nPour activer cette protection, utilisez la commande \`` + data.guild.prefix + `antialt on\``)
            }
        }

        if (args[0] === "on") {
            if (data.guild.antiAlt === true) {
                return message.channel.send(`:x: **|** La protection contre les comptes trop récents est déjà activée !\n__Exemple__: \`${data.guild.prefix}antialt off\` pour désactiver cette protection.`)
            } else {
                data.guild.antiAlt = true
                await data.guild.save()
                return message.channel.send(`:white_check_mark: **|** La protection contre les comptes trop récents est maintenant activée !`)
            }
        } else if (args[0] === "off") {
            if (data.guild.antiAlt === true) {
                data.guild.antiAlt = false
                await data.guild.save()
                return message.channel.send(`:white_check_mark: **|** La protection contre les comptes trop récents est maintenant désactivée !`)
            } else {
                return message.channel.send(`:x: **|** La protection contre les comptes trop récents est déjà désactivée !\n__Exemple__: \`${data.guild.prefix}antialt on\` pour activer cette protection.`)
            }
        } else {
            return message.channel.send(`:x: **|** Vous devez spécifier si vous voulez désactiver ou activer cette protection !\n__Exemple__: \`${data.guild.prefix}antialt on\` activera la protection contre les comptes trop récents.`)
        }
    }
}