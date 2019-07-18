

module.exports = {
    usage: "b;help",
    examples: "b;help [command]",
    description: "このメッセージの表示",
    Do: async message => {
        const list = require("./list")
        const msg = new Array()

        for (const key in list) {
            msg.push(
                `${key}: ${list[key].description}`
            )
        }

        message.channel.send(`\`\`\`Prefix b;\n${msg.join("\n")}\`\`\`https://github.com/BinaryDolphin29/botchan`)
    }
}