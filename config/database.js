const {development, testing, production} = require('./environment');

module.exports = {
    development: {
        username: development.DB_USERNAME,
        password: development.DB_PASSWORD,
        database: development.DB_DATABASE,
        host: development.DB_HOST,
        port: development.DB_PORT,
        dialect: development.DB_DIALECT,
        logging: false,
    },
    testing: {
        username: testing.DB_USERNAME,
        password: testing.DB_PASSWORD,
        database: testing.DB_DATABASE,
        host: testing.DB_HOST,
        port: testing.DB_PORT,
        dialect: testing.DB_DIALECT,
        logging: false,
    },
    production: {
        username: production.DB_USERNAME,
        password: production.DB_PASSWORD,
        database: production.DB_DATABASE,
        host: production.DB_HOST,
        port: production.DB_PORT,
        dialect: production.DB_DIALECT,
        logging: false,
    }
}