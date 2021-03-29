const express = require('express');
//esse objeto permite declarar rotas sem aquela instanciação de app
const router = express.Router();

router.get("/admin/categories/new", (req, res)=>{
    res.render("admin/categories/new")
});


//depois é só exportar o router
module.exports = router;