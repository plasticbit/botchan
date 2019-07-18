module.exports = {
    message: require("./client/message/message"),
    other: {
        ready: require("./other/ready"),
        warn: require("./other/warn"),
        error: require("./other/error"),
        disconnect: require("./other/disconnect")
    }
}
