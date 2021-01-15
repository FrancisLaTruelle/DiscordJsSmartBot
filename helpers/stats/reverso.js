const Reverso = require('reverso-api')
const reverso = new Reverso()

module.exports.getTranslation = async function(content, language1, language2) {
    let toreturn = await reverso.getTranslation(content, language1, language2)
    return (toreturn.translation[0]+'').charAt(0).toUpperCase()+toreturn.translation[0].substr(1)
}