// Discord.js : https://github.com/discordjs/discord.js
// Document   : https://discord.js.org/#/
const { Client, Message, Intents } = require("discord.js")
const client = new Client({
    ws: Intents.ALL
})

// ログイン
client.login(process.env.BOT_TOKEN)

const handler = require("./event/handler")

// イベント
client
    .on("message", handler.message)
    .on("guildMemberAdd", handler.memberAdd)
    .on("disconnect", handler.disconnect)
    .on("warn", handler.warn)
    .on("error", handler.error)
    .on("ready", () => handler.ready(client))

process
    .on("exit", () => client.destroy())
    .on("SIGTERM", () => client.destroy())
    .on("warning", warning => console.log(`Warning (process): ${warning.stack}\n`))
    .on("unhandledRejection", (reason, promise) => console.log(`Reason: ${reason}\n%o`, promise))
    .on("SIGINT", () => {
        client.destroy()
        process.exit(0)
    })
