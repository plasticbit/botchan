const { Message } = require("discord.js")
const emojis = ["1️⃣", "2️⃣", "3️⃣", "4️⃣", "5️⃣", "☑"]

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

        msg.awaitReactions(async (reaction, User) => {
            const ReactName = reaction.emoji.name

            if (
                User == message.client.user ||
                User.id != message.author.id ||
                !emojis.includes(ReactName)
            ) return

            if (ReactName === emojis[5]) {
                msg.edit(`${ReactName}`)
            }


        })
        // msg.await

    }
}