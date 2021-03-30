const express = require('express');
//esse objeto permite declarar rotas sem aquela instanciação de app
const router = express.Router();
//model de categorias
const Category = require("../categories/Category");
const Article = require("../articles/Article");
const slugify = require("slugify");

router.get("/articles", (req, res)=>{
    res.send("ROTA DE ARTIGOS");
});

router.get("/admin/articles/new", (req, res)=>{
    const categories = Category.findAll()
        .then(categories => {
            res.render("admin/articles/new", {categories: categories});
        });
});

router.post("/articles/save", (req, res)=>{
    var title = req.body.title;
    var category = req.body.category;
    console.log(category);
    var article = req.body.body;

    if(title != undefined){
        Article.create({
            title: title,
            slug: slugify(title),
            body: article,
            categoryId: category
        }).then(()=>{
            res.redirect("/admin/articles");
        });
    } else {
        res.redirect("/admin/articles/new");
    }
});
//depois é só exportar o router
module.exports = router;