const Discord = require("discord.js")

module.exports = {
    name: "ban",
    description: "Bannir définitivement un membre",
    usage: "ban <days> <mention> [reason]",
    enabled: true,
    aliases: [],
    category: "Modération",
    memberPermissions: ["MANAGE_MESSAGES"],
    botPermissions: [ "SEND_MESSAGES", "EMBED_LINKS" ],
    nsfw: false,
    cooldown: 5000,
    ownerOnly: false,

    async execute(client, message, args, data) {
        if (!args[0]) return message.channel.send(`:x: **|** Vous devez indiquer le nombre de jours de messages à supprimer !\n__Exemple__: ${data.guild.prefix}ban <@${message.author.id}> 7 Insultes`)
        if (isNaN(args[0])) return message.channel.send(`:x: **|** \`${args[0]}\` n'est pas un nombre !\n__Exemple__: ${data.guild.prefix}ban <@${message.author.id}> 7 Insultes`)
        if (parseInt(args[0]) < 0 || parseInt(args[0]) >  7) return message.channel.send(`:x: **|** \`${args[0]}\` doit être compris entre **0** et **7** !`)
        
        if (!args[1]) return message.channel.send(`:x: **|** Vous n'avez pas mentionné d'utilisateur !\n__Exemple__: ${data.guild.prefix}ban <@${message.author.id}> 7 Insultes`)
        const user = message.mentions.users.first()
        if (user === message.author) return message.channel.send(`:x: **|** Vous ne pouvez pas vous bannir vous même !`); 

        let reason = args.slice(2).join(' ') ? args.slice(2).join(' ') : "Aucune raison !"

        const member = message.guild.members.cache.get(user.id)
        if (!member) return message.channel.send(`:x: **|** L'utilisateur mentionné n'est pas sur le serveur !`)
        if (!member.bannable) return message.channel.send(`:x: **|** Je ne peux pas bannir cette utilisateur car je n'ai pas les permssions suffisantes !`)

        member.ban({ days: args[0], reason: reason});

        const embed = new Discord.MessageEmbed()
            .setColor('GREEN')
            .setTitle("Nouveau bannissement !")
            .setThumbnail(user.displayAvatarURL())
            .addFields(
                { name: 'Cible', value: user.username},
                { name: 'Auteur', value: message.author.username, inline: true },
                { name: 'Raison', value: reason},
                { name: 'Durée', value: "Définitive", inline: true },
            )
            .setTimestamp()
        message.channel.send(embed)
    }
}