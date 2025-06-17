require('dotenv').config();

const commonConfig = {
    database: process.env.DB_NAME,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    port: process.env.PORT
};

module.exports = {
    develop: {
        ...commonConfig,
        dialect: 'mysql',
        port: 3306
    },
    production: {
        ...commonConfig,
        dialect: 'mssql',
        port: 1433,
        dialectOptions: {
            options: {
                encrypt: true,
                trustServerCertificate: false
            }
        }
    }
};