const router = require("express").Router()
const bcrypt = require('bcryptjs')
const User = require("./../models/User.model")
const rounds = 10

//registro
router.get("/register", (req, res, next) => res.render("auth/register-form"))

router.post("/register", (req, res, next) => {

    const { userPassword } = req.body

    bcrypt
        .genSalt(rounds)
        .then(salt => bcrypt.hash(userPassword, salt))
        .then(hashedPassword => User.create({ ...req.body, userPassword: hashedPassword }))
        .then(createdUser => {
            console.log('NEW USER ==>', createdUser)
            res.redirect("/login")
        })
        .catch(error => next(error))
})

router.get("/login", (req, res, next) => res.render("auth/login-form"))

router.post("/login", (req, res, next) => {

    const { username, userPassword } = req.body

    User
        .findOne({ username })
        .then(user => {
            if (!user) {
                res.render("auth/login-form", { errorMessage: "Usuario no registrado" })
                return
            } else if (bcrypt.compareSync(userPassword, user.userPassword) === false) {
                res.render("auth/login-form", { errorMessage: "Contraseña incorrecta" })
                return
            } else {
                req.session.currentUser = user
                res.redirect("/")
            }
        })
        .catch(error => next(error))
})

router.post('/logout', (req, res) => {
    req.session.destroy(() => res.redirect('/'))
})

module.exports = router