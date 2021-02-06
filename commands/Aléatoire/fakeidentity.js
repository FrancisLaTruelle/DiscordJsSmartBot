const Discord = require("discord.js")
const helper = require("../../helpers/stats/fakeidentity.js")
const reverso = require("../../helpers/stats/reverso.js")

module.exports = {
    name: "fakeidentity",
    description: "Avoir des informations sur le COVID-19",
    usage: "fakeidentity",
    enabled: true,
    aliases: [],
    category: "Aléatoire",
    memberPermissions: [],
    botPermissions: [ "SEND_MESSAGES", "EMBED_LINKS" ],
    nsfw: false,
    cooldown: 3000,
    ownerOnly: false,

    async execute(client, message, args, data) {
        let fakeidData = await helper.genFakeIdentity()        
        let colorFR = await reverso.getTranslation(fakeidData.color, 'English', 'French')
        let sportFR = await reverso.getTranslation(fakeidData.sport, 'English', 'French')
        let hairFR = await reverso.getTranslation(fakeidData.hair, 'English', 'French')
        let eyeFR = await reverso.getTranslation(fakeidData.eye, 'English', 'French')
        const embed = new Discord.MessageEmbed()
            .setTitle("Fausse identité aléatoire")
            .setDescription(`[Lien de génération](https://namefake.com${fakeidData.url.split(".com")[1]})`)
            .setThumbnail("https://i.pinimg.com/originals/a2/d9/fc/a2d9fc9fb05e1e7f2b2709cab6db3c67.jpg")
            .addField("Nom et prénom", fakeidData.name, true)
            .addField("Adresse", fakeidData.address, true)
            .addField("Nom de jeune fille", fakeidData.maiden_name, true)
            .addField("Anniversaire", fakeidData.birth_data, true)
            .addField("Numéro de téléphone personnel", fakeidData.phone_h, true)
            .addField("Numéro de téléphone travail", fakeidData.phone_w, true)
            .addField("Email", fakeidData.email_u + "@" + fakeidData.email_d, true)
            .addField("Pseudonyme", fakeidData.username, true)
            .addField("Couleur préférée", colorFR, true)
            .addField("Taille", fakeidData.height + "cm", true)
            .addField("Poids", fakeidData.weight + "kg", true)
            .addField("Type de sanguin", fakeidData.blood, true)
            .addField("Couleur de yeux", eyeFR, true)
            .addField("Couleur de cheveux", hairFR, true)
            .addField("Sport préféré", sportFR, true)
        message.channel.send(embed)
    }
}