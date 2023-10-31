module.exports = {
    development: {
        dialect: 'postgres',
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        database: 'onebitflix_development',
        username: process.env.DB_USER,
        password: process.env.DB_PASSWORD
    }
}