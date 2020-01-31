const { Message } = require("discord.js")

module.exports = {
    usage: "",
    examples: "",
    description: "",

    /** @param {Message} message **/
    Do: message => {
        const memtion = message.mentions.members.first()
    }
}