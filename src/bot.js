const { Client, Message } = require("discord.js")
const client = new Client({
    messageCacheMaxSize: 500,
    messageCacheLifetime: 120,
    messageSweepInterval: 60
})

// ログイン
client.login(process.env.BOT_TOKEN || "Token")

const handler = require("./event/handler")
const other = handler.other

// イベント
client.once("ready", () => other.ready(client))
.on("message", handler.message)
.on("disconnect", other.disconnect)
.on("warn", other.warn)
.on("error", other.error)

process.on("exit", async () => {
    await client.destroy()
    process.exit(0)
})

.on("SIGINT", async () => {
    await client.destroy()
    console.log("ログアウトしました。")

    process.exit(0)
})

.on("warning", warning => {
    console.log(`Warning (process): ${warning.stack}\n`)
})

.on("unhandledRejection", (reason, promise) => {
    console.log(`Reason:\n${reason}\nPromise: \n%o`, promise)
})
