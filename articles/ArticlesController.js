const express = require('express');
//esse objeto permite declarar rotas sem aquela instanciação de app
const router = express.Router();
//model de categorias
const Category = require("../categories/Category");
const Article = require("../articles/Article");
const slugify = require("slugify");
//middleware de autenticação
const adminAuth = require("../middlewares/adminauth");

router.get("/admin/articles", adminAuth,(req, res)=>{
    Article.findAll(
        //incluindo o objeto category
        {include: [{model: Category}]}
        ).then(articles => {
        res.render("admin/articles/index", {articles: articles});
    }); 
});

router.get("/admin/articles/new", adminAuth, (req, res)=>{
    const categories = Category.findAll()
        .then(categories => {
            res.render("admin/articles/new", {categories: categories});
        });
});

router.get("/admin/articles/edit/:id", adminAuth, (req, res)=>{
    var id = req.params.id;

    if(isNaN(id)){
        res.redirect("/admin/articles");
    }

    Article.findByPk(id).then(article =>{
        if(article){
            Category.findAll().then(categories => {
                res.render("admin/articles/edit", 
                {
                    article: article, categories:categories
                });
            })
            
        } else{
            res.redirect("/admin/articles");
        }
    }).catch(error => {
        res.redirect("/admin/articles");
    });
    
});

router.get("/articles/page/:num", (req, res) => {
    const page = req.params.num;
    const limit = 4;
    var offset = 0;

    if(isNaN(page) || page == 1){
        offset = 0;
    } else {
        offset = (parseInt(page) - 1) * limit; 
    }

    //retorna os elementos e a quantidade deles
    Article.findAndCountAll({
        //limita a 4 registros
        limit: limit,
        offset: offset,
        order:[
            ['id', 'DESC']
        ]
    }).then(articles => {
        var next;
        if(offset + limit >= articles.count){
            next = false;
        } else {
            next = true;
        }
        //verificando se existe outra página ainda
        var result = {
            page: parseInt(page),
            next: next,
            articles: articles,
        }

        Category.findAll().then(categories => {
            res.render("admin/articles/page", {result: result, categories: categories});
        });
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

router.post("/articles/update", (req, res)=>{
    var id = req.body.id;
    var title = req.body.title;
    var categoryId = req.body.category;
    var article = req.body.body;

    if(title != undefined){
        Article.update({title: title, slug: slugify(title), body: article,categoryId: categoryId},
            { 
                where: {id:id}
            })
            .then(()=>{
                res.redirect("/admin/articles");
        });
    } else {
        res.redirect("/admin/articles/new");
    }
});

router.post("/articles/delete", (req, res)=>{
    var id = req.body.id;

    if(id != undefined && !isNaN(id)){
        Article.destroy({
            where: {id: id}
        }).then(()=>{
            res.redirect("/admin/articles");
        });
    } else {
        res.redirect("/admin/articles");
    }
});





//depois é só exportar o router
module.exports = router;