const { Message, MessageMentions: { USERS_PATTERN } } = require("discord.js")

module.exports = {
    usage: "b;votekick @MENTION REASON",
    examples: "b;votekick @MENTION REASON",
    description: "迷惑なユーザーをサーバーからキックするコマンドです。",

    /** @param {Message} message **/
    Do: message => {
        const mentions = message.mentions.members
        const channel = message.channel
        const reason = message.args[2]

        if (mentions.size !== 1 || !USERS_PATTERN.test(message.args[0])) {
            channel.send("引数が無効です。\n\n例: b;votekick @MENTION REASON", global.syntax)
        } else {
            const member = mentions.first()
            const voteMessage = channel.send({
                embed: {
                    color: 0xFF0000,
                    title: "このユーザーをキックしますか？",
                    fields: [{
                        name: "対象ユーザー",
                        value: member.displayName,
                        inline: true
                    },
                    {
                        name: "理由",
                        value: reason,
                        inline: true
                    }],
                    thumbnail: {
                        url: member.displayAvatarURL
                    }
                }
            })
        }
    }
}

// b;votekick @MENTION REASON
// index:        0       1