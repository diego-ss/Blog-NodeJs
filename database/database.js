const Sequelize = require("sequelize");

const connection = new Sequelize('blognodejs', 'root', 'Diego!1996', {
    host:"localhost",
    dialect: "mysql"
});

module.exports = connection;