const Sequelize = require("sequelize");
//importando conexão com bd
const connection = require("../database/database");

const Article = connection.define('articles', {
    title:{
        type: Sequelize.STRING,
        allowNull: false
    },
    //rota do artigo
    slug: {
        type: Sequelize.STRING,
        allowNull: false
    },
    //texto do artigo
    body: {
        type: Sequelize.TEXT,
        allowNull: false
    }
});

module.exports = Article;