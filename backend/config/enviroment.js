const dotenv = require("dotenv")
dotenv.config({ path: "backend/.env" })

const { DEVELOPMENT_URI, PRODUCTION_URI, PORT, NODE_ENV, JSONWEBTOKEN_SECRET_KEY, COOKIE_EXPIRES_TIME } = process.env

const config = {
    database: {
        uri: NODE_ENV === "development" ? DEVELOPMENT_URI : PRODUCTION_URI
    },
    node_env: NODE_ENV,
    port: PORT || 5000
    ,
    JsonWebTokenConfig: {
        secret_key: JSONWEBTOKEN_SECRET_KEY || ''
    },
    cookieConfig: {
        expiresTime: COOKIE_EXPIRES_TIME
    },
}

module.exports = config;

