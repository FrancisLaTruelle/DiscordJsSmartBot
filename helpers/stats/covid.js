const fetch = require("node-fetch")

module.exports.totalUpdateData = async function() {
    const response = await fetch("https://api.covid19api.com/summary")
    const data = await response.json()
    return data
}