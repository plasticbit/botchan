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
        const msg = await message.channel.send("ちょっと まって", global.syntax)

        for (const emoji in emojis) {
            await msg.react(emoji)
        }

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
                msg.edit(`いま => ${input.join("")}`, global.syntax)
            } else {
                msg.edit(`けっか => ${input.join("")}`, global.syntax)
                msg.clearReactions()
            }


        }, { timeout: 30000 })

        msg.edit("R E A D Y !!", global.syntax)
    }
}
/* https://discord.js.org/#/docs/main/stable/class/Message?scrollTo=createReactionCollector

const collector = message.createReactionCollector((reaction, user) => 
    reaction.emoji.name === '👌' &&
    user.id === 'someID', {
        time: 15000
    }
);

collector.on('collect', r => console.log(`Collected ${r.emoji.name}`));
collector.on('end', collected => console.log(`Collected ${collected.size} items`));
*/