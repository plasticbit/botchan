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
        const filter = channels.filter(ch => ch.name === channel.name)

        if (channel.parentID !== "640931602309971970") {
            message.reply("このコマンドは`LANG`カテゴリーのみ有効です。")
        } else if (filter.size >= 3) {
            message.reply("チャンネルが複数あります。\nこれ以上チャンネルを作ることはできません！", global.syntax)
        } else {
            const newChannel = await guild.createChannel(channel.name, { type: "text" })
            await newChannel.setTopic(`${message.author.id},${Date.now()}`)
            await newChannel.setParent("640931602309971970")
            await newChannel.setPosition(channel.position)
            await newChannel.send(`このチャンネルは ${message.member.toString()} によって作成されました！\n__\`解決すれば closeコマンドを実行し、チャンネルを削除してください\`__`)
            
            // LANG-CATEGORY: 640931602309971970
            // TEST-CATEGORY: 393442427912060928
        }
    }
}