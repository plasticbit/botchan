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

        msg.edit("R E A D Y !!", {
            code: true
        })

        const mainMsg = msg.content
        let input = new Array()
        msg.awaitReactions(async (reaction, User) => {
            const ReactName = reaction.emoji.name

            if (
                User == message.client.user ||
                User.id != message.author.id ||
                !Object.keys(emojis).includes(ReactName)
            ) return



            if (ReactName !== Object.keys(emojis)[5]) {
                input.push(emojis[ReactName])
                msg.edit(`${mainMsg}\nいま => ${input.join("")}`)
            } else {
                msg.edit(`\`input => ${input.join("")}\``)
                msg.clearReactions()
            }


        }, { timeout: 30000 })
        // msg.await

    }
}
/*
https://discord.js.org/#/docs/main/stable/class/Message?scrollTo=createReactionCollector

const filter = (reaction, user) => reaction.emoji.name === '👌' && user.id === 'someID'
const collector = message.createReactionCollector(filter, { time: 15000 });
collector.on('collect', r => console.log(`Collected ${r.emoji.name}`));
collector.on('end', collected => console.log(`Collected ${collected.size} items`));
*/