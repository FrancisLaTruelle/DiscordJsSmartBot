const Discord = require("discord.js")
const helper = require("../../helpers/stats/covid.js")

module.exports = {
    name: "covid",
    description: "Avoir des informations sur le COVID-19",
    usage: "covid [pays]",
    enabled: true,
    aliases: [],
    category: "Statistiques",
    memberPermissions: [],
    botPermissions: [ "SEND_MESSAGES", "EMBED_LINKS" ],
    nsfw: false,
    cooldown: 3000,
    ownerOnly: false,

    async execute(client, message, args, data) {
        let covidData = await helper.totalUpdateData()
        if (args[0]) {
            var countrie = args.slice(0).join(' ').toLowerCase()
            let resolved = false
            for (let i = 0; i < covidData.Countries.length; i++) {
                if(covidData.Countries[i].CountryCode === countrie.toUpperCase()) {
                    const embed = new Discord.MessageEmbed()
                        .setTitle("COVID-19 Statistiques en " + covidData.Countries[i].Country)
                        .setDescription("[Conseils au public](https://www.gouvernement.fr/info-coronavirus)")
                        .setThumbnail("https://images-ext-1.discordapp.net/external/VuHYALYsfPqddjfhxSB7hYmoACEYNgJdxlcE5lQDFHo/https/cdn.koya.gg/utilities/COVID-19.png")
                        .addField("Nouveaux cas", covidData.Countries[i].NewConfirmed, true)
                        .addField("Nouveaux décès", covidData.Countries[i].NewDeaths, true)
                        .addField("Nouvelles guérisons", covidData.Countries[i].NewRecovered, true)
                        .addField("Total des cas", covidData.Countries[i].TotalConfirmed, true)
                        .addField("Total des décès", covidData.Countries[i].TotalDeaths, true)
                        .addField("Total des guérisons", covidData.Countries[i].TotalRecovered, true)
                        .addField("Total des cas mondial", covidData.Global.TotalConfirmed, true)
                        .addField("Total des décès mondial", covidData.Global.TotalDeaths, true)
                        .addField("Total des guérisons mondial", covidData.Global.TotalRecovered, true)
                    message.channel.send(embed)
                    resolved = true
                }
                if (Object.keys(covidData.Countries).length === i + 1) {
                    if (resolved === false) {
                        message.channel.send(":x: **|** Pays introuvable !\n__Exemple__: `" + data.guild.prefix + "covid FR` pour obtenir les statisques en France !")
                    }
                }
            }
            
        } else {
            const embed = new Discord.MessageEmbed()
                .setTitle("COVID-19 Statistiques mondiales")
                .setDescription("[Conseils au public](https://www.gouvernement.fr/info-coronavirus)")
                .setThumbnail("https://images-ext-1.discordapp.net/external/VuHYALYsfPqddjfhxSB7hYmoACEYNgJdxlcE5lQDFHo/https/cdn.koya.gg/utilities/COVID-19.png")
                .addField("Nouveaux cas", covidData.Global.NewConfirmed, true)
                .addField("Nouveaux décès", covidData.Global.NewDeaths, true)
                .addField("Nouvelles guérisons", covidData.Global.NewRecovered, true)
                .addField("Total des cas", covidData.Global.TotalConfirmed, true)
                .addField("Total des décès", covidData.Global.TotalDeaths, true)
                .addField("Total des guérisons", covidData.Global.TotalRecovered, true)
                .setImage("https://covid19.mathdro.id/api/og")
            message.channel.send(embed)
        }
    }
}