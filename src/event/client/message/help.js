const list = require("./list")

module.exports = {
    usage: "b;help",
    examples: "b;help [command]",
    description: "ヘルプの表示",
    Do: async message => {

        const msg = new Array()
        const url = "https://github.com/BinaryDolphin29/botchan/"
        const client = message.client
        const ping = Math.floor(client.ping)

        for (const key in list) {
            msg.push(`${key}: ${list[key].description}`)
        }

        message.channel.send(
            `\`\`\`Prefix b;\n${msg.join("\n")}\n\nPing: ${ping}ms\`\`\`${url}`
        )
    }
}