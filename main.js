Object.defineProperty(global, "syntax", {
    value: {
        code: true
    },
    writable: false
})

require("./src/bot")