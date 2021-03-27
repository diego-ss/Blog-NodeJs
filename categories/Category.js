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

//atualizando a tabela sempre que a aplicação é iniciada
//Category.sync({force:true});

module.exports = Category;