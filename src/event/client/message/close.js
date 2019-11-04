const { Message } = require("discord.js")

module.exports = {
    usage: "...",
    examples: "...",
    description: "delete channel",

    /** @param {Message} message */
    Do: message => {
        const channel = message.channel
        const authorID = message.author.id
        const TCauthorID = (channel.topic || "").split(",")[0]
        
        if (authorID === TCauthorID && channel.parentID === "640931602309971970") {
            channel.delete()
        }
    }
}