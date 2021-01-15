const Discord = require('discord.js')

module.exports = {

    name: "setprefix",
    description: "Définir le préfix du bot pour votre serveur",
    usage: "setprefix <prefix>",
    enabled: true,
    aliases: ["prefix", "pset"],
    category: "Administrateur",
    memberPermissions: [ "ADMINISTRATOR" ],
    botPermissions: [ "SEND_MESSAGES", "EMBED_LINKS" ],
    nsfw: false,
    ownerOnly: false,
    cooldown: 5000,

    async execute(client, message, args, data) {

        if (!args[0]) {
            if (data.guild.antiAlt === false) {
                return message.channel.send(`:white_check_mark: **|** La protection contre les comptes récent est \`désactivée\` !\nPour l'activée, utilisez la commande \`` + data.guild.prefix + `antialt enable\``)
            } else {
                return message.channel.send(`:white_check_mark: **|** La protection contre les comptes récent est \`activée\` !\nPour la désactivée, utilisez la commande \`` + data.guild.prefix + `antialt disable\``)
            }
        }

        if (args[0] === "enable") {
            if (data.guild.antiAlt === false) {
                data.guild.prefix = true
                await data.guild.save()
                return message.channel.send(`:white_check_mark: **|** La protéction contre les comptes récents est maintenant activée !`)
            } else {
                return message.channel.send(`:x: **|** La protection contre les comptes récent est déjà activée !`)
            }
        } else if (args[0] === "disable") {
            if (data.guild.antiAlt === true) {
                data.guild.prefix = false
                await data.guild.save()
                return message.channel.send(`:white_check_mark: **|** La protéction contre les comptes récents est maintenant désactivée !`)
            } else {
                return message.channel.send(`:x: **|** La protection contre les comptes récent est déjà désactivée !`)
            }
        } else {
            if (data.guild.antiAlt === false) {
                return message.channel.send(`:white_check_mark: **|** La protection contre les comptes récent est \`désactivée\` !\nPour l'activée, utilisez la commande \`` + data.guild.prefix + `antialt enable\``)
            } else {
                return message.channel.send(`:white_check_mark: **|** La protection contre les comptes récent est \`activée\` !\nPour la désactivée, utilisez la commande \`` + data.guild.prefix + `antialt disable\``)
            }
        }
    }
}