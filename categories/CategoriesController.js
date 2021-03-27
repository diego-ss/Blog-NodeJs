const express = require('express');
//esse objeto permite declarar rotas sem aquela instanciação de app
const router = express.Router();

router.get("/categories", (req, res)=>{
    res.send("ROTA DE CATEGORIAS");
});

router.get("/admin/categories/new", (req, res)=>{
    res.send("ROTA DE CRIAÇÃO DE CATEGORIAS");
});

//depois é só exportar o router
module.exports = router;