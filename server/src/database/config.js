const config = {
    User: process.env.DB_USER,
    Password: process.env.DB_PASS,
    Server: process.env.DB_SERVER, // You can use 'localhost\\instance' to connect to named instance
    Database: process.env.DB_DATABASE,
}

const stringConfig = `Server=${config.Server};Database=${config.Database};User Id=${config.User};Password=${config.Password};`


module.exports = stringConfig;