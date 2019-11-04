const { Message } = require("discord.js")

module.exports = {
    usage: "...",
    examples: "...",
    description: "delete channel",

    /** @param {Message} message */
    Do: message => {
        const channel = message.channel
        const authorID = message.author.id
        const TCauthorID = channel.topic.split(",")[0]
        
        if (authorID === TCauthorID && channel.parentID === "393442427912060928") {
            channel.delete()
        }
    }
}