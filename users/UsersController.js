const express = require("express");
const router = express.Router();
const User = require("./User");
const bcrypt = require("bcryptjs");
//middleware de autenticação
const adminAuth = require("../middlewares/adminauth");

function hashPassword(password){
     //gerando um "sal" para "temperar" a criptografia
     var salt = bcrypt.genSaltSync(10);
     //gerando hash
     var hashpassword = bcrypt.hashSync(password, salt);
     return hashpassword;
}

router.get("/admin/users", adminAuth, (req, res) => {

    User.findAll()
        .then(users => {
            if(users){
                res.render("admin/users/index", {users:users});
            }
        }).catch((error) => {
            res.render("/");
        });
});

router.get("/admin/users/create", adminAuth, (req, res) => {
    res.render("admin/users/create");
});

router.post("/users/add", (req, res) => {
    var email = req.body.email;
    var password = req.body.password;

    User.findOne({
        where: {email: email}
    }).then(user => {
        if(user == undefined){
            var hashpassword = hashPassword(password);

            User.create({
                email: email,
                password: hashpassword
            }).then(()=>{
                res.redirect("/admin/users");
            }).catch((error) => {
                res.send(error);
            });
        } else {
            res.redirect("/admin/users/create");
        }
    });
});

router.get("/login", (req, res) => {
    res.render("admin/users/login");
});

router.get("/logout", (req, res) => {
    req.session.user = undefined;
    res.redirect("/");
});

router.post("/authenticate", (req, res) => {
    var email = req.body.email;
    var password = req.body.password;
    var hashpassword = hashPassword(password);

    User.findOne({
        where: {email: email}
    }).then(user => {
        if(user){
            var correct = bcrypt.compareSync(password, user.password);

            if(correct){
                req.session.user = {
                    id: user.id,
                    email: user.email
                }
                res.redirect("/admin/articles");
            } else {
                res.redirect("/login");
            }
        } else {
            res.redirect("/login");
        }
    });
});

//User.sync({force: true});
module.exports = router;