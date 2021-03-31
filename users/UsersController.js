const express = require("express");
const router = express.Router();
const User = require("./User");

router.get("/admin/users", (req, res) => {
    res.send("listagem de usuários");
});

router.get("/admin/users/create", (req, res) => {
    res.render("admin/users/create");
});

router.post("/users/add", (req, res) => {
    var email = req.body.email;
    var password = req.body.password;

    User.create({
        email: email,
        password: password
    }).then(()=>{
        res.redirect("/admin/users");
    }).catch((error) => {
        res.send(error);
    });
});

//User.sync({force: true});
module.exports = router;