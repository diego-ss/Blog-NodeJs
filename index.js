//carregando express
const express = require("express");
const app = express();
//carregando body parser
const bodyParser = require("body-parser");
//carregando conexão
const connection = require("./database/database");
//importando controllers
const categoriesController = require("./categories/CategoriesController");
const articlesController = require("./articles/ArticlesController");
//importando models
const Article = require("./articles/Article");
const Category = require("./categories/Category");

//setando view engine para ejs
app.set("view engine", 'ejs');

// Static itens estáticos na pasta public
app.use(express.static("public"));

//criando rota principal
app.get("/", (req, res)=>{
    //renderizando página index
    Article.findAll({
        order:[
            ['id', 'DESC']
        ]
    }).then(articles => {
        Category.findAll()
        .then(categories => {
            res.render("index", 
            {articles: articles, categories: categories});
        });
    });

});

//criando rota de artigo
app.get("/:slug", (req, res)=>{
    var slug = req.params.slug;

    try{
        //renderizando página do artigo
        Article.findOne({
            where: {slug: slug}
        }).then(article => {
            if(article){
                Category.findAll()
        .then(categories => {
            res.render("article", {article: article, categories: categories});
        });
            }
            else{
                res.redirect("/");
            }
    });
    } catch {
        res.redirect("/");
    }
});

app.get("/category/:slug", (req, res) => {
    var slug = req.params.slug;
    console.log(slug);
    try{
        //renderizando página do artigo
        Category.findOne({
            where: {slug: slug},
            include: [{model: Article}]
        }).then(category => {
            if(category){
                Category.findAll().then(categories => {
                    res.render("index", {articles: category.articles, categories: categories});
                });
            }
            else{
                res.redirect("/");
            }
    });
    } catch {
        res.redirect("/");
    }
});

//body parser
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//database
connection
    .authenticate()
    .then(()=> {
        console.log("conexão com bd feita com sucesso!");
    })
    .catch((error) => {
        console.error(erro);
    });


//utilizando rotas importadas
//pode ser utilizado um prefixo aqui na rota
app.use("/", categoriesController);
app.use("/", articlesController);

//inicializando servidor
app.listen(8080, () => {
    console.log("O servidor está rodando!");
});