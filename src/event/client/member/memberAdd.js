module.exports = member => {
    const botsRole = member.guild.roles.get("340590246238355456")

    if (botsRole && member.user.bot) {
        member.addRole(botsRole, "このユーザーは, botです")
    }
}