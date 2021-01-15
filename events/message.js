const Discord = require("discord.js")
const config = require("./../config.json")
const cmdCooldown = {}

module.exports = async(client, message) => {
try {
  if(message.author.bot) return

  if(!message.guild){
    return message.channel.send(":x: **|** Mes messages privés sont désactivés. Utilisez la commande `v!help` sur votre serveur pour commencer !")
  }

  let guildDB = await client.data.getGuildDB(message.guild.id)

  let prefix = !guildDB.prefix ? config.prefix : guildDB.prefix

  if(!message.content.toLowerCase().startsWith(prefix)){
    if(message.content ===`<@!${message.client.user.id}>`){
      return message.channel.send(":interrobang: **|** Vous avez oublié mon prefix ? C'est `" + prefix + "` ! Utilisez le avant une commande pour la commande soit prise en compte.\n__Exemple__: `" + prefix + "help`")
    }
    return
  }

  const args = message.content.slice(prefix.length).trim().split(/ +/g)
  const commandName = args.shift().toLowerCase()
  const cmd = client.commands.get(commandName) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName))

  if(!cmd) return message.channel.send(`:x: **|** Cette commande n'existe pas ! Faites ` + "`" + prefix + "help` pour obtenir la liste des commandes !")
  if(!cmd.enabled) return message.channel.send(`:x: **|** Cette commande n'est pas activée !`)

  let data = {}
  data.config = config
  data.guild = guildDB
  data.cmd = cmd


  if(!message.channel.nsfw && cmd.nsfw){
    return message.channel.send(`:x: **|** Cette commande doit être effectuée dans un salon NSFW !`)
  }

  if(message.guild){

    let userNotPerms = []

    cmd.memberPermissions.forEach((perm) => {
    if(!message.channel.permissionsFor(message.member).has(perm)){
        userNotPerms.push(perm)
      }
    })

    if(userNotPerms.length > 0){
        return message.channel.send(":x: **|** Il semble que vous n'ayez pas les permissions suivantes:\n" + userNotPerms.map((p) => `\`${p}\``).join(", "))
    }

    let clientNotPerms = []

    cmd.botPermissions.forEach((perm) => {
    if(!message.channel.permissionsFor(message.guild.me).has(perm)){
        clientNotPerms.push(perm)
        }
    })

    if(clientNotPerms.length > 0){
        return message.channel.send(":x: **|** Il semble que je n'ai pas les permissions suivantes:\n" +clientNotPerms.map((p) => `\`${p}\``).join(", "))
    }

  }

  let userCooldown = cmdCooldown[message.author.id]

  if(!userCooldown){
      cmdCooldown[message.author.id] = {}
      uCooldown = cmdCooldown[message.author.id]
  }

  let time = uCooldown[cmd.name] || 0

  if(time && (time > Date.now())){
    let timeLeft = Math.ceil((time-Date.now())/1000)
    return message.channel.send(`:x: **|** Vous devez patienter ${timeLeft} secondes !`)
  }

    cmdCooldown[message.author.id][cmd.name] = Date.now() + cmd.cooldown

    cmd.execute(client, message, args, data)
    client.log("log", `${message.author.tag} used ${cmd.name}`)

  } catch(err) {
      console.error(err)
  }
}