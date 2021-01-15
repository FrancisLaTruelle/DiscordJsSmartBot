const Discord = require("discord.js")
const fs = require('fs')
const mongoose = require("mongoose")
const asciimo = require('asciimo').Figlet
const config = require("./config.json")
const client = new Discord.Client({
    disableEveryone: true,
    autoReconnect: true,
    fetchAllMembers: true,
    disabledEvents: ["TYPING_START"],
    partials: ['MESSAGE', 'CHANNEL', 'GUILD_MEMBER', 'REACTION']
})

client.log = require("./modules/logger.js")
client.tools = require("./modules/tools.js")
client.data = require("./database/mongoDB.js")


asciimo.write("Smart", "Colossal", function(art){
	console.log(art)
	console.log("Bienvenue sur le SmartBot (Discord.js v.12.2) !")
	console.log("Développé par FrancisLaTruelle")
	console.log(" ")
})

client.commands = new Discord.Collection()

fs.readdir("./commands/", (err, content) => {
	if(err) console.log(err)
	if(content.length < 1) return console.log('Veuillez créer des dossiers dans le dossier commands !')
	var groups = []
	content.forEach(element => {
		if(!element.includes('.')) groups.push(element)
	})
	groups.forEach(folder => {
		fs.readdir("./commands/"+folder, (e, files) => {
			let js_files = files.filter(f => f.split(".").pop() === "js")
			if(js_files.length < 1) return console.log('Veuillez créer des fichiers dans le dossier "'+folder+'" !')
			if(e) console.log(e)
			js_files.forEach(element => {
				let props = require('./commands/'+folder+'/'+element)
				client.commands.set(element.split('.')[0], props)
			})
		})
	})
})

fs.readdir("./events/", (err, f) => {
	if(err) console.log(err)
	console.log(`${f.length} events en chargement`)

	f.forEach((f) => {
		const events = require(`./events/${f}`)
		const event = f.split(".")[0]
	
		client.on(event, events.bind(null, client))
	})
})

mongoose.connect(config.mongoDB, {
	useNewUrlParser: true,
	useUnifiedTopology: true
}).then(() => {
	client.log("loaded", "Connexion établie avec la base de données MongoDB")
	client.login(config.token)
}).catch((err) => {
	client.log("error", "Impossible de se connecter à la base de données MongoDB. Erreur: "+err)
})


client.on("disconnect", () => client.log("warn", "Le bot se déconnecte ..."))
	.on("reconnecting", () => client.log("warn", "Reconnexion du bot ..."))
	.on("error", (e) => client.log("error", e))
	.on("warn", (i) => client.log("warn", i))

process.on("unhandledRejection", (err) => {
	console.error(err)
})
