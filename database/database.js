const Sequelize = require("sequelize");

const connection = new Sequelize('blognodejs', 'diegoss', 'Diego!1996', {
    host:"mysql743.umbler.com",
    dialect: "mysql",
    timezone: "-03:00" //ajustando timezone do banco de dados
});

module.exports = connection;