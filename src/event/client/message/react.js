const { Message } = require("discord.js")

module.exports = {
    usage: "",
    examples: "",
    description: "",

    /** @param {Message} message */
    Do: async message => {
        const msg = await message.channel.send("R E A C T  T E S T", {
            code: true
        })


        await msg.react("1️⃣")
        await msg.react("2️⃣")
        await msg.react("3️⃣")
        await msg.react("4️⃣")
        await msg.react("5️⃣")


        msg.awaitReactions(async (reaction, User) => {
            const ReactName = reaction.emoji.name
            console.log(ReactName)
            console.log(msg.reactions.map(v => v.name))
            // if (
            //     User == message.client.user ||
            //     User.id != message.author.id ||
            //     !Emoji.includes(ReactName)
            // ) return
        })
        // msg.await

    }
}