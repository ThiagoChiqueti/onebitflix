import { Sequelize } from  'sequelize'

export const sequelize = new Sequelize({
    dialect: 'postgres',
    host: process.env.DB_HOST,
    port: Number(process.env.PORT),
    database: 'onebitflix_development',
    username: 'postgres',
    password: 'postgres',
    define:{
        underscored: true
    }
})