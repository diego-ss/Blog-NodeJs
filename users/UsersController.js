const express = require("express");
const router = express.Router();
const User = require("./User");
const bcrypt = require("bcryptjs");

router.get("/admin/users", (req, res) => {
    User.findAll()
        .then(users => {
            if(users){
                res.render("admin/users/index", {users:users});
            }
        }).catch((error) => {
            res.render("/");
        });
});

router.get("/admin/users/create", (req, res) => {
    res.render("admin/users/create");
});

router.post("/users/add", (req, res) => {
    var email = req.body.email;
    var password = req.body.password;

    User.findOne({
        where: {email: email}
    }).then(user => {
        if(user == undefined){
            //gerando um "sal" para "temperar" a criptografia
            var salt = bcrypt.genSaltSync(10);
            //gerando hash
            var hashpassword = bcrypt.hashSync(password, salt);

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

//User.sync({force: true});
module.exports = router;