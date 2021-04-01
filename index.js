//carregando express
const express = require("express");
const app = express();
//carregando body parser
const bodyParser = require("body-parser");
//body parser
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
//carregando conexão
const connection = require("./database/database");
//importando controllers
const categoriesController = require("./categories/CategoriesController");
const articlesController = require("./articles/ArticlesController");
const usersController = require("./users/UsersController");
//importando models
const Article = require("./articles/Article");
const Category = require("./categories/Category");
const User = require("./users/User");
//importando express session para sessões
const session = require("express-session");

//setando view engine para ejs
app.set("view engine", 'ejs');

//SESSIONS
//REDIS - BD PARA SALVAR SESSÕES E CASH
app.use(session({
    //secret para aumentar a segurança da sessão
    secret: "PorqueDeusamouomundodetalmaneiraquedeuseuFilhoUnigenitoparaquetodoaquelequenElecrernaoperecamastenhavidaeterna",
    //configurando cookie (tempo máximo 30 seg)
    cookie: {maxAge: 1200000},
    resave:true,
    saveUninitialized: true
}));

//---------------------------------------

// Static itens estáticos na pasta public
app.use(express.static("public"));

//criando rota principal
app.get("/", (req, res)=>{
    //renderizando página index
    Article.findAll({
        order:[
            ['id', 'DESC']
        ],
        limit: 4
    }).then(articles => {
        Category.findAll()
        .then(categories => {
            res.render("index", 
            {articles: articles, categories: categories});
        });
    });

});

//rotas para sessões
app.get("/session", (req, res)=> {
    //podemos guardar qualquer tipo de dados aqui
    //eles podem ser acessados globalmente
    req.session.treinamento = "Treinando sessions";
    req.session.ano = "2021";
    req.session.email = "asdasdas";
    req.session.user = {
        username: "teste",
        email: "email@email.com",
        id: 10
    }
    res.send("Sessão gerada!");
});

app.get("/leitura", (req, res)=> {
    //acessando dados gravados
    res.json({
        treinamento: req.session.treinamento,
        ano: req.session.ano,
        email: req.session.email,
        usuario: req.session.user,
    });
});
//---------------------------------

//utilizando rotas importadas
//pode ser utilizado um prefixo aqui na rota
app.use("/", categoriesController);
app.use("/", articlesController);
app.use("/", usersController);


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


//database
connection
    .authenticate()
    .then(()=> {
        console.log("conexão com bd feita com sucesso!");
    })
    .catch((error) => {
        console.error(erro);
    });


//inicializando servidor
//3000 é a porta que roda no umbler
app.listen(3000, () => {
    console.log("O servidor está rodando!");
});