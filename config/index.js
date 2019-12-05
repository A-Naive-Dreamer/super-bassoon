const {
    PORT,
    DATABASE_HOST,
    DATABASE_PASSWORD,
    DATABASE_NAME,
    JWT_SECRET_KEY
} = require('./environment'),
    {
        connect,
        get,
        close
    } = require('./connection')

module.exports = {
    PORT: PORT,
    DATABASE_HOST: DATABASE_HOST,
    DATABASE_PASSWORD: DATABASE_PASSWORD,
    DATABASE_NAME: DATABASE_NAME,
    JWT_SECRET_KEY: JWT_SECRET_KEY,
    connect: connect,
    get: get,
    close: close
}