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

router.get("/login", (req, res, next) => res.render("auth/login-form"))

router.post("/login", (req, res, next) => {

    const { username, userPassword } = req.body

    if (email.length === 0 || userPassword.length === 0) {
        res.render("auth/resgister-form", { errorMessage: "Rellena todos los campos" })
        return
    }

    User
        .findOne({ email })
        .then(user => {
            if (!user) {
                res.render("/auth/login-form", { errorMessage: "Email no registrado" })
                return
            } else if (bcryptjs.compareSync(userPassword, hashPassword) === false) {
                res.render("/auth/login-form", { errorMessage: "Contraseña incorrecta" })
                return
            } else {
                req.session.currentUser = user
                res.redirect("/")
            }
        })
        .catch(error => next(error))
})