const mongoose = require("mongoose")
const config = require("../../config.json")

module.exports = mongoose.model("Guild", new mongoose.Schema({

    _id: { type: String },
    registeredAt: { type: Number, default: Date.now() },
    prefix: { type: String, default: config.prefix },
    antiAlt: {type: Boolean, default: false},

    addons: { type: Object, default: {
        welcome: {
        enabled: false,
        channel:  null,
        message: null
        },
        goodbye: {
        enabled: false,
        channel:  null,
        message: null
        }
    }}

}))