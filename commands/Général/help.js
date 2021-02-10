const Discord = require("discord.js")

module.exports = {
    name: "help",
    description: "Obtenez la liste des commandes du bot",
    usage: "help [commande]",
    enabled: true,
    aliases: ["commands"],
    category: "General",
    memberPermissions: [],
    botPermissions: [ "SEND_MESSAGES", "EMBED_LINKS" ],
    nsfw: false,
    cooldown: 3000,

    async execute(client, message, args, data) {
        if(!args[0]){
            let category = await client.commands.map(x => x.category)
            let embed = new Discord.MessageEmbed()
                .setTitle("Liste des commandes de " + client.user.username + " !")
                .setDescription("Faites `" + data.guild.prefix + "help [commande]` pour obtenir des informations sur une commande.\n__Exemple__: `" + data.guild.prefix + "help help` vous donnera des informations sur la commande d'aide !")
                .setColor("GREEN")

            let catList = []
            for(let i=0; i < category.length; i++){
                if(!catList.includes(category[i])){
                    catList.push(category[i])
                    let cmdList = await client.commands.filter(x => x.category === category[i]).map(x => x.name).join(", ")
                    embed.addField(category[i], "```" + cmdList + "```", true)
                }
            }
            return message.channel.send(embed)
        }else{
            let cmd = await client.commands.get(args[0].toLowerCase())
            if(!cmd){
                return message.channel.send(`:x: **|** Commande \`${args[0]}\` inconnu !`)
            }

            let embed = new Discord.MessageEmbed()
                .setTitle(`Aide pour la commande : ${cmd.name}`)
                .setDescription(`**Description:** ${cmd.description}\n**Utilisation:** \`${data.guild.prefix}${cmd.usage}\`\n**Catégorie:** ${cmd.category}\n**Temps entre chaque utilisation:** ${cmd.cooldown/1000} secondes\n**Aliases:** ${cmd.aliases}\n**Commande NSFW:** ${cmd.nsfw === true ? "Oui" : "Non"}\n**Permission(s) requise(s):** ${cmd.memberPermissions}`)
                .setColor("GREEN")
            return message.channel.send(embed)

        }
    },
}