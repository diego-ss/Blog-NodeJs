//carregando express
const express = require("express");
const app = express();
//carregando body parser
const bodyParser = require("body-parser");
//carregando conexão
const connection = require("./database/database");

//setando view engine para ejs
app.set("view engine", 'ejs');

// Static itens estáticos na pasta public
app.use(express.static("public"));

//criando rota principal
app.get("/", (req, res)=>{
    //renderizando página index
    res.render("index");
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

//inicializando servidor
app.listen(8080, () => {
    console.log("O servidor está rodando!");
});