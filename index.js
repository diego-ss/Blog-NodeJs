//carregando express
const express = require("express");
const app = express();

//criando rota principal
app.get("/", (req, res)=>{
    res.send("Bem vindo!");
});