const Discord = require("discord.js")
const config = require("./../config.json")

const guildsDB = require("./schemas/guildSchema")

module.exports.getGuildDB = async function (guildID){

  let guildDB = await guildsDB.findOne( { _id: guildID } )

  if(guildDB){
    return guildDB
  } else {
    guildDB = new guildsDB({
      _id: guildID
    })
    await guildDB.save().catch(err => console.log(err))
    return guildDB
  }
}