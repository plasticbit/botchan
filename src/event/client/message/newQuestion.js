const { Message } = require("discord.js")

module.exports = {
    usage: "...",
    examples: "...",
    description: "create new channel",

    /** @param {Message} message */
    Do: message => {

        const guild = message.guild
        const channel = message.channel
        const channels = guild.channels
        const filter = channels.filterArray(ch => ch.name === channel.name)

        if (filter.length > 3) {
            channel.reply("チャンネルが複数あります。\nこれ以上チャンネルを作ることはできません！", global.syntax)
        } else {
            guild.createChannel(channel.name, {
                type: "text"
            })
        }
    }
}