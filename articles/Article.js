const Sequelize = require("sequelize");
//importando conexão com bd
const connection = require("../database/database");
//importando model categoria para relacionamento 
const Category = require("../categories/Category");

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

//EXPRESSANDO RELACIONAMENTOS
Category.hasMany(Article); // x tem muitos y 
Article.belongsTo(Category); // x pertence a y

//atualizando a tabela sempre que a aplicação é iniciada
//Article.sync({force:true});

module.exports = Article;