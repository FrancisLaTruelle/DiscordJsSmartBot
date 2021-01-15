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

  async execute(client, message, args, data){

    if(!args[0]){
        return message.channel.send(`:white_check_mark: **|** Le préfix actuel du bot pour ${message.guild.name} est \`` + data.guild.prefix + `\`\nPour le changer, utilisez la commande \`` + data.guild.prefix + `setprefix <prefix>\``)
    }

    if(args[0].length > 5){
        return message.channel.send(`:x: **|** Impossible d'attribuer ce préfixe, assurez-vous que la longueur du préfixe est inférieure à 5 caractères !`)
    }

    data.guild.prefix = args[0]
    await data.guild.save()
    return message.channel.send(`:white_check_mark: **|** Le nouveau préfix a bien été définit sur \`${args[0]}\` !\nFaites la commande \`${args[0]}help\` pour voir les commandes disponibles !`)

  },
}