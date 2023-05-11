const dotenv = require("dotenv")
dotenv.config({ path: "backend/.env" })

const { DEVELOPMENT_URI, PRODUCTION_URI, PORT, NODE_ENV } = process.env

const config = {
    database: {
        uri: NODE_ENV === "development" ? DEVELOPMENT_URI : PRODUCTION_URI
    },
    port: PORT || 5000
}

module.exports = config;


