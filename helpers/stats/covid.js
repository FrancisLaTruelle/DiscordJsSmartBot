const fetch = require("node-fetch")

module.exports.totalUpdateData = async function() {
    const response = await fetch("https://api.covid19api.com/summary")
    const data = await response.json()
    return {
        NewConfirmed: data.Global.NewConfirmed,
        TotalConfirmed: data.Global.TotalConfirmed,
        NewDeaths: data.Global.NewDeaths,
        TotalDeaths: data.Global.TotalDeaths,
        NewRecovered: data.Global.NewRecovered,
        TotalRecovered: data.Global.NewRecovered
    }
}

module.exports.countriesUpdateData = async function() {
    const response = await fetch("https://api.covid19api.com/summary")
    const data = await response.json()
    return {
        Countries: data.Countries
    }
}