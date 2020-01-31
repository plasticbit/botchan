const { Message, MessageMentions: { USERS_PATTERN } } = require("discord.js")
const voteEmojis = ["🈶", "🈚"]

module.exports = {
    usage: "b;votekick @MENTION REASON",
    examples: "b;votekick @MENTION REASON",
    description: "迷惑なユーザーをサーバーからkickするコマンドです。",

    /** @param {Message} message **/
    Do: async message => {
        // RegExp.lastIndex 回避のため
        const PATTERN = new RegExp(USERS_PATTERN, "")
        const mentions = message.mentions.members
        const channel = message.channel
        let reason = "理由がありません！！"

        if (message.args.length >= 1) reason = message.args.slice(1).join(" ")
        if (mentions.size !== 1 || !PATTERN.test(message.args[0])) {
            channel.send("引数が無効です。\n\n例: b;votekick @MENTION REASON", global.syntax)
        } else {
            const member = mentions.first()
            if (!member.kickable) {
                channel.send("このユーザーはkickできません・・・", global.syntax)
                return
            }

            const voteMessage = await channel.send({
                embed: {
                    color: 0xFF0000,
                    title: "このユーザーを***kick***しますか？",
                    fields: [{
                        name: "対象ユーザー",
                        value: member.displayName,
                    },
                    {
                        name: "理由",
                        value: reason,
                    }],
                    thumbnail: {
                        url: member.user.displayAvatarURL
                    },
                    timestamp: new Date()
                }
            })

            await voteMessage.react(voteEmojis[0])
            await voteMessage.react(voteEmojis[1])

            const collector = voteMessage.createReactionCollector((reaction, user) => voteEmojis.includes(reaction.emoji.name) && user.id !== message.client.user.id && !user.bot, { time: 15000 })
            collector.on("collect", r => console.log(`Collected ${r.emoji.name}`))
            collector.on("end", collected => console.log(`Collected ${collected.size} items`))
        }
    }
}

// b;votekick @MENTION REASON
// index:        0       1

// 投票メッセージをピン留め