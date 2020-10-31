const list = require("./list")

module.exports = message => {
    const prefix = "b;"
    const client = message.client
    
    if (message.author.id === client.user.id || message.channel.type !== "text") {
        return
    }

    console.log(message.guild.members)

    if (message.content.substr(0, 2) == prefix) {
        const content = message.content.substr(2).split(/\s/)
        const command = content[0]
        message.args = content.slice(1).filter(value => value !== "")

        for (const key in list) {
            if (key.toLowerCase() === command.toLowerCase()) {
                list[key].Do(message)
                break
            }
        }
    }
}