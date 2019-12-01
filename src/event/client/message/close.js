module.exports = {
    usage: "b;close",
    examples: "b;close",
    description: "b;newQuestion で作成したチャンネルを削除します。",

    /** @param {global.Message} message */
    Do: message => {
        const channel = message.channel
        const authorID = message.author.id
        const TCauthorID = (channel.topic || "").split(",")[0]
        
        if (authorID === TCauthorID && channel.parentID === "640931602309971970") {
            channel.delete()
        }
    }
}