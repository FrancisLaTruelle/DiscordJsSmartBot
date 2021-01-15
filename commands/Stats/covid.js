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
        if (args[0]) {
            var countrie = args.slice(0).join(' ').toLowerCase()
            let covidData = await helper.countriesUpdateData()
            console.log((countrie+'').charAt(0).toUpperCase()+countrie.substr(1))
            for (let i = 0; i < covidData.Countries.length; i++) {
                if(covidData.Countries[i].Country === (countrie+'').charAt(0).toUpperCase()+countrie.substr(1)) {
                    console.log("founded :)")
                    const embed = new Discord.MessageEmbed()
                        .setTitle("COVID-19 Statistiques en " + (countrie+'').charAt(0).toUpperCase()+countrie.substr(1))
                        .setDescription("[Conseils au public](https://www.gouvernement.fr/info-coronavirus)")
                        .setThumbnail("https://images-ext-1.discordapp.net/external/VuHYALYsfPqddjfhxSB7hYmoACEYNgJdxlcE5lQDFHo/https/cdn.koya.gg/utilities/COVID-19.png")
                        .addField("Nouveaux cas", covidData.Countries[i].NewConfirmed, true)
                        .addField("Nouveaux décès", covidData.Countries[i].NewDeaths, true)
                        .addField("Nouvelles guérisons", covidData.Countries[i].NewRecovered, true)
                        .addField("Total des cas", covidData.Countries[i].TotalConfirmed, true)
                        .addField("Total des décès", covidData.Countries[i].TotalDeaths, true)
                        .addField("Total des guérisons", covidData.Countries[i].TotalRecovered, true)
                    message.channel.send(embed)
                }
            }
            
        } else {
            let covidData = await helper.totalUpdateData()
            const embed = new Discord.MessageEmbed()
                .setTitle("COVID-19 Statistiques mondiales")
                .setDescription("[Conseils au public](https://www.gouvernement.fr/info-coronavirus)")
                .setThumbnail("https://images-ext-1.discordapp.net/external/VuHYALYsfPqddjfhxSB7hYmoACEYNgJdxlcE5lQDFHo/https/cdn.koya.gg/utilities/COVID-19.png")
                .addField("Nouveaux cas", covidData.NewConfirmed, true)
                .addField("Nouveaux décès", covidData.NewDeaths, true)
                .addField("Nouvelles guérisons", covidData.NewRecovered, true)
                .addField("Total des cas", covidData.TotalConfirmed, true)
                .addField("Total des décès", covidData.TotalDeaths, true)
                .addField("Total des guérisons", covidData.TotalRecovered, true)
                .setImage("https://covid19.mathdro.id/api/og")
            message.channel.send(embed)
        }
    }
}