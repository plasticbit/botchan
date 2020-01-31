const { Message, ReactionCollector, MessageMentions: { USERS_PATTERN } } = require("discord.js")
const voteEmojis = ["⭕", "❌"]

module.exports = {
    usage: "b;votekick @MENTION REASON",
    examples: "b;votekick @MENTION REASON",
    description: "迷惑なユーザーをサーバーからkickするコマンドです。",

    /** @param {Message} message **/
    Do: async message => {
        // RegExp.lastIndex 回避のため
        const PATTERN = new RegExp(USERS_PATTERN, "")

        const voterList = new Set()
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

            // オフライン, アイドルを除くギルドユーザーの10%, 5人に満たないサーバーは2人に設定
            const voters = Math.round(message.guild.members.filter(m => !m.user.bot || !["offline", "idle"].includes(m.presence.status)).size * 0.1) || 2
            const voteMessage = await channel.send("@here", {
                embed: {
                    color: 0xFF0000,
                    title: "このユーザーを***kick***しますか？",
                    description: `この投票は${voters*2}分間有効で、${voters}人の投票が必要です。\nなお、一度投票すると変更することは出来ません。`,
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
                },
            })

            await voteMessage.react(voteEmojis[0])
            await voteMessage.react(voteEmojis[1])

            /** @type {ReactionCollector} */
            const collector = voteMessage.createReactionCollector((reaction, user) => {
                const filter = voteEmojis.includes(reaction.emoji.name) && user.id !== message.client.user.id && user.id !== member.user.id && !voterList.has(user.id) && !user.bot
                voterList.add(user.id)

                return filter
            }, { time: 15000 })

            collector.on("end", async collected => {
                console.log(`Collected ${collected.size} items`)

                if (true                          ||collected.size <= voters) {
                    const yes = collected.get(voteEmojis[0])
                    // const no = collected.get(voteEmojis[1]).count-1

                    console.log(yes)
                    // try {
                    //     // await message.guild.members.get(member.id).kick(reason)
                    //     channel.send("kickしました。", global.syntax)
                    // } catch (e) {
                    //     channel.send(`kickできませんでした。\n\n${e.message}`, global.syntax)
                    // }
                } else {
                    channel.send("投票人数が一定数を超えなかったため、kickできませんでした。", global.syntax)
                }
            })
        }
    }
}

// b;votekick @MENTION REASON
// index:        0       1

// 投票メッセージをピン留め
// 同じ人が絵文字を2つ押した時

// new Set().add(["ID", true])
// { time: 1800000 }
// { time: (1000 * 60) * (voters * 2) }

 // collector.on("collect", r => console.log(`Collected ${r.emoji.name}`))