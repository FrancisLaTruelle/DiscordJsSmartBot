const fetch = require("node-fetch")
const Reverso = require('reverso-api')
const reverso = new Reverso()

module.exports.genFakeIdentity = async function() {
    const response = await fetch("https://api.namefake.com/")
    return await response.json()
}