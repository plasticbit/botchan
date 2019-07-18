const Emoji = ["⭕", "❌"]
module.exports = {
    usage: "b;addRole\nb;addRole <number>,\nb;addRole <name>",
    examples: "b;addRole\nb;addRole 4\nb;addRole discord.js",
    description: "ユーザーへ役職を追加します。",
    Do: async message => {
        const client = message.client
        const member = message.guild.member(message.author)
        const map = new Map()
        const Roles = message.guild.roles.filter(_ =>
            _.calculatedPosition < message.guild.me.highestRole.calculatedPosition &&
            !_.managed &&
            !/@everyone|Mute/.test(_.name) &&
            !message.member.roles.has(_.id)
        ).sort((a, b) => {
            a = a.position
            b = b.position

            switch (true) {
                case a < b: return 1
                case a > b: return -1
                default: return 0
            }
        })

        if (!!!Roles.size) {
            message.reply("追加できる役職が存在しません😭", global.syntax)
            return
        }

        let number = 0
        const list = Roles.map(role => {
            number++
            map.set(number, role)
            return `${number} ${role.name}`
        })

        const half = list.length / 2
        const embed = {
            embed: {
                color: 0xff1493,
                fields: [],
                footer: {
                    text: `合計：${list.length}`
                }
            }
        }

        if (half >= 5) {
            let list1 = half
            let list2 = half

            if (list.length % 2 !== 0) {
                list1 += 1
                list2 += 1
            }

            embed.embed.fields.push({
                name: "追加可能な役職一覧",
                value: `\`\`\`\n${list.slice(0, list1).join("\n")}\n\`\`\``,
                inline: true
            },
            {
                name: "ㅤ",
                value: `\`\`\`\n${list.slice(list2).join("\n")}\n\`\`\``,
                inline: true
            })
        } else {
            embed.embed.fields = [{
                name: "追加可能な役職一覧",
                value: `\n\`\`\`\n${list.join(",\n")}\n\`\`\`\n`
            }]
        }

        // TODO: 候補を表示
        if (!!message.args.length) {
            const arg = message.args[0].toLocaleLowerCase()
            const a = map.get(Number(arg))
            const b = Roles.find($ => $.name.toLocaleLowerCase().startsWith(arg))
            const result = a || b

            if (!result) {
                message.reply("その役職は見つかりませんでした😭", global.syntax)
                    .then(m => m.delete(7000))
                return
            }

            const main_message = await message.reply({
                embed: {
                    color: 0xff1493,
                    title: "役職を追加しますか？",
                    description: `\`\`\`c\n\"${result.name}\"\n\`\`\``
                }
            })

            await main_message.react(Emoji[0])
            await main_message.react(Emoji[1])

            main_message.awaitReactions(async (reaction, User) => {
                const ReactName = reaction.emoji.name

                if (
                    User == client.user ||
                    User.id != message.author.id ||
                    !Emoji.includes(ReactName)
                ) return

                await main_message.delete()

                switch (ReactName) {
                    case Emoji[1]:
                        message.reply("キャンセルしました👋", global.syntax)
                            .then(m => m.delete(7000))
                        break

                    case Emoji[0]:
                        try {
                            await member.addRole(result, `${message.author.username} -> ${result.name}`)
                            message.reply(`役職を追加しました。\n\`\`\`c\n\"${result.name}\"\n\`\`\``)
                        } catch (err) {
                            console.log(err)
                            message.reply(
                                `役職を割り当てられませんでした。\n\`\`\`js\n${("message" in err ? `-> ${err.message}` : "...")}\`\`\``
                            )
                        }
                        break

                    default: return
                }
            }, { timeout: 30000 })
        } else {
            message.reply(embed)
                .then(m => m.delete(15000))
        }
    }
}
