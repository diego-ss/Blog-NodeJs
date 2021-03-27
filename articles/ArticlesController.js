const express = require('express');
//esse objeto permite declarar rotas sem aquela instanciação de app
const router = express.Router();

router.get("/articles", (req, res)=>{
    res.send("ROTA DE ARTIGOS");
});

router.get("/admin/articles/new", (req, res)=>{
    res.send("ROTA DE CRIAÇÃO DE ARTIGOS");
});

//depois é só exportar o router
module.exports = router;