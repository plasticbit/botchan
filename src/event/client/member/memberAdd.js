module.exports = member => {
    const botsRole = member.guild.roles.cache.get("340590246238355456")

    if (botsRole && member.user.bot) {
        member.roles.add(botsRole, "このユーザーは, botです")
    }
}