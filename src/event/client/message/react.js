const { Message } = require("discord.js")
const emojis = {
    "1️⃣": "1",
    "2️⃣": "2",
    "3️⃣": "3",
    "4️⃣": "4",
    "5️⃣": "5",
    "☑": "ok"
}

module.exports = {
    usage: "",
    examples: "",
    description: "",

    /** @param {Message} message */
    Do: async message => {
        const msg = await message.channel.send("R E A C T  T E S T", {
            code: true
        })

        for (let i = 0; i < emojis.length; i++) {
            await msg.react(emojis[i])
        }

        let input = new Array()
        msg.awaitReactions(async (reaction, User) => {
            const ReactName = reaction.emoji.name

            if (
                User == message.client.user ||
                User.id != message.author.id ||
                !emojis.keys().includes(ReactName)
            ) return



            if (ReactName === emojis.keys()[5]) {
                msg.edit(`${input.join(", ")}`)
                msg.clearReactions()
            } else {
                input.push(emojis.get(ReactName))
            }


        })
        // msg.await

    }
}