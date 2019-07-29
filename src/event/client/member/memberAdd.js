exports.module = member => {
    const botsRole = member.guild.roles.get("340590246238355456")

    if (botsRole && member.user.bot) {
        member.addRole(botsRole, "BOT_USER!!")
    }
}