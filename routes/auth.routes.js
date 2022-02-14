const router = require("express").Router
const bcryptjs = require("bcryptjs")

const User = require("./../models/User.model")
const rounds = 10

//registro
router.get("/register", (req, res, next) => res.render("auth/resgister-form"))

router.post("/register", (req, res, next) => {
    const { email, username, userPassword } = req.body

    bcryptjs
        .genSalt(rounds)
        .then(salt => bcryptjs.hash(userPassword, salt))
        .then(hashPassword => {
            return User.create({ email, username, password: hashPassword })
        })
        .then(() => res.redirect("/login"))
        .catch(error => next(error))
})