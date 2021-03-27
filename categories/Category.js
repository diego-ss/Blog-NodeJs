const Sequelize = require("sequelize");
//importando conexão com bd
const connection = require("../database/database");

const Category = connection.define('categories', {
    title:{
        type: Sequelize.STRING,
        allowNull: false
    },
    //rota da categoria
    slug: {
        type: Sequelize.STRING,
        allowNull: false
    }
});

module.exports = Category;