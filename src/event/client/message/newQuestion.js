const { Message } = require("discord.js")

module.exports = {
    usage: "...",
    examples: "...",
    description: "create new channel",

    /** @param {Message} message */
    Do: async message => {

        const guild = message.guild
        const channel = message.channel
        const channels = guild.channels
        const filter = channels.filterArray(ch => ch.name === channel.name)

        message.guild.c

        if (filter.length >= 3) {
            message.reply("チャンネルが複数あります。\nこれ以上チャンネルを作ることはできません！", global.syntax)
        } else {
            const newChannel = await guild.createChannel(channel.name, { type: "text" })
            await newChannel.setParent("393442427912060928")
            
            // LANG-CATEGORY: 640931602309971970
            // TEST-CATEGORY: 393442427912060928
        }
    }
}