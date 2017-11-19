const PROXY_CONFIG = [
    {
        context: [
            "/api",
            "/many",
            "/endpoints",
            "/i",
            "/need",
            "/to",
            "/proxy"
        ],
        target: "http://http://127.0.0.1:8000/",
        secure: false
    }
]

module.exports = PROXY_CONFIG;