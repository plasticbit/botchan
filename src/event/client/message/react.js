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


        await message.react("1️⃣")
        await message.react("2️⃣")
        await message.react("3️⃣")
        await message.react("4️⃣")
        await message.react("5️⃣")


        msg.awaitReactions(async (reaction, User) => {
            const ReactName = reaction.emoji.name
            console.log(ReactName)
            console.log(msg.reactions.name)
            // if (
            //     User == message.client.user ||
            //     User.id != message.author.id ||
            //     !Emoji.includes(ReactName)
            // ) return
        })
        // msg.await

    }
}