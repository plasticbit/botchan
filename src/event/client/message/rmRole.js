const Emoji = ["⭕", "❌"]

module.exports = {
    usage: "b;rmRole,\nb;rmRole <number>,\nb;rmRole <name>",
    examples: "b;rmRole\nb;rmRole 4\nb;rmRole role",
    description: "ユーザーの役職を取り外します。",

    /** @param {global.Message} message */
    Do: async message => {
        const map = new Map()
        const Roles = message.member.roles.filter(r =>
            r.calculatedPosition < message.guild.me.highestRole.calculatedPosition &&
            !r.managed &&
            r.name !== "@everyone"
        ).sort((a, b) => {
            a = a.position
            b = b.position

            switch (true) {
                case a < b: return 1
                case a > b: return -1
                default: return 0
            }
        })

        let size = 0
        const list = Roles.map(role => {
            size++
            map.set(size, role)
            return `${size} ${role.name}`
        })

        if (!!!Roles.size) {
            message.reply("取り外しできる役職が存在しません😭", global.syntax)
            return
        }

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
                name: "取り外し可能な役職一覧",
                value: `\`\`\`${list.slice(0, list1).join("\n")}\`\`\``,
                inline: true
            },
            {
                name: "ㅤ",
                value: `\`\`\`${list.slice(list2).join("\n")}\`\`\``,
                inline: true
            })
        } else {
            embed["embed"]["fields"] = [{
                name: "取り外し可能な役職一覧",
                value: `\n\`\`\`\n${list.join(",\n")}\n\`\`\`\n`
            }]
        }

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
                    title: "役職を取り除きますか？",
                    description: `\`\`\`c\n\"${result.name}\"\n\`\`\``
                }
            })

            await main_message.react(Emoji[0])
            await main_message.react(Emoji[1])

            main_message.awaitReactions(
                async (reaction, User) => {
                    const ReactName = reaction.emoji.name

                    if (
                        User == message.client.user ||
                        User.id != message.author.id ||
                        !Emoji.includes(ReactName)
                    ) return

                    await main_message.delete()

                    switch (ReactName) {
                        case Emoji[1]:
                            const cancel = await message.reply("キャンセルしました👋", global.syntax)
                            cancel.delete(5000)
                        break

                        case Emoji[0]:
                            try {
                                await message.member.removeRole(result, `${message.author.username} -> ${result.name}`)
                                await message.reply(`取り外しました。\n\`\`\`c\n\"${result.name}\"\n\`\`\``)
                            } catch (err) {
                                console.log(err)
                                message.reply(
                                    `役職を取り外す事ができませんでした。\n\`\`\`js\n${("message" in err ? `-> ${err.message}` : "...")}\`\`\``
                                )
                            }
                        break

                        default: return
                    }
                }, {
                    timeout: 30000
                }
            ).catch(console.log)
        } else {
            message.reply(embed)
                .then(m => m.delete(15000))
        }
    }
}