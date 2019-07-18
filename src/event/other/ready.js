module.exports = client => {
    console.log("ログインしました。")
    client.user.setActivity("Prefix b;", {
        type: "PLAYING"
    })
}