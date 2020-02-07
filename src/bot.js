const { Client, Message } = require("discord.js")
const client = new Client({
    messageCacheMaxSize: 500,
    messageCacheLifetime: 120,
    messageSweepInterval: 60
})

// ログイン
client.login(process.env.BOT_TOKEN)

const handler = require("./event/handler")

// イベント
client.on("ready", () => handler.ready(client))
.on("message", handler.message)
.on("guildMemberAdd", handler.memberAdd)
.on("disconnect", handler.disconnect)
.on("warn", handler.warn)
.on("error", handler.error)

process.on("exit", async () => {
    await client.destroy()
}).on("SIGINT", async () => {
    await client.destroy()
    process.exit(0)
}).on("SIGTERM", async () => {
    await client.destroy()
}).on("warning", warning => {
    console.log(`Warning (process): ${warning.stack}\n`)
}).on("unhandledRejection", (reason, promise) => {
    console.log(`Reason: ${reason}\n%o`, promise)
})