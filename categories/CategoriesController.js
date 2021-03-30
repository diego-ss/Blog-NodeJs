const express = require('express');
//esse objeto permite declarar rotas sem aquela instanciação de app
const router = express.Router();
//model de categorias
const Category = require("./Category");
const slugify = require("slugify");

router.get("/admin/categories/new", (req, res)=>{
    res.render("admin/categories/new")
});

router.post("/categories/save", (req, res)=>{
    var title = req.body.title;

    if(title != undefined){
        Category.create({
            title: title,
            slug: slugify(title)
        }).then(()=>{
            res.redirect("/");
        });
    } else {
        res.redirect("/admin/categories/new");
    }
});

router.get("/admin/categories", (req, res)=>{

    Category.findAll().then(categories => {
        res.render("admin/categories/index", 
        {categories: categories})
    });
    
});

//depois é só exportar o router
module.exports = router;