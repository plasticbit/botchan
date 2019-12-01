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
        const msg = await message.channel.send("ちょっとまて", {
            code: true
        })

        for (const emoji in emojis) {
            await msg.react(emoji)
        }

        msg.edit("R E A C T   T E S T", {
            code: true
        })

        let input = new Array()
        msg.awaitReactions(async (reaction, User) => {
            const ReactName = reaction.emoji.name

            if (
                User == message.client.user ||
                User.id != message.author.id ||
                !Object.keys(emojis).includes(ReactName)
            ) return



            if (ReactName === Object.keys(emojis)[5]) {
                msg.edit(`\`input => ${input.join(" ")}\``)
                msg.clearReactions()
            } else {
                input.push(emojis[ReactName])
            }


        })
        // msg.await

    }
}