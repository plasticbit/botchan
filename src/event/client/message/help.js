// const { Message } = require("discord.js")

module.exports = {
    usage: "b;help",
    examples: "b;help [command]",
    description: "ヘルプの表示",

    Do: async message => {
        
        const list = require("./list")

        const msgs = new Array()
        const url = "https://github.com/BinaryDolphin29/botchan/"
        const client = message.client
        const ping = Math.floor(client.ping)

        for (const key in list) {
            msgs.push(`${key}: ${list[key].description}`)
        }

        message.channel.send(
`\`\`\`
Prefix b;
${msgs.join("\n")}

Ping: ${ping}ms - ${Math.trunc((Date.now() - message.guild.createdTimestamp) / 86400000)}日目
\`\`\`
${url}
`
        )
    }
}