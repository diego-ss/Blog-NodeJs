const Sequelize = require("sequelize");

const connection = new Sequelize('blognodejs', 'root', 'Diego!1996', {
    host:"localhost",
    dialect: "mysql",
    timezone: "-03:00" //ajustando timezone do banco de dados
});

module.exports = connection;