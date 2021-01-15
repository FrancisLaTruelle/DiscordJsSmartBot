const Discord = require("discord.js")

module.exports = async(client, member) => {
    let guildData = await client.data.getGuildDB(member.guild.id);
    if (guildData.antiAlt === true) {
        let isMemberFake = (Date.now() - member.user.createdTimestamp) < 7*24*60*60*1000
        if (isMemberFake) {
            return member.send(`:shield: **|** La date de création de votre compte Discord est trop récente pour rejoindre ce Discord !`).then(() => member.kick())
        }
    }
}