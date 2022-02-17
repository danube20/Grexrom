const router = require("express").Router()
const transporter = require('./../config/transporter.config')
const bcrypt = require('bcryptjs')
const User = require("./../models/User.model")
const rounds = 10

//registro
router.get("/register", (req, res, next) => res.render("auth/register-form"))

router.post("/register", (req, res, next) => {

    const { userPassword, email } = req.body

    bcrypt
        .genSalt(rounds)
        .then(salt => bcrypt.hash(userPassword, salt))
        .then(hashedPassword => User.create({ ...req.body, userPassword: hashedPassword }))
        .then(() => {
            res.redirect("/login")
            return transporter.sendMail({
                from: '"Grexrom Museum " <grexrom0122@gmail.com>',
                to: email,
                subject: 'Successful register in Grexrom!',
                text: 'Thanks for registering in Grexrom Museum!',
                html: '<b>You are now part of the family of the Grexrom Museum!</b><br>Now you have full access to our museum. You can see all the fabulous artworks and, <i>just for being member of our museum</i>, you will have and anticipated email with the purchase link to get a ticket for the next exhibition.<br><b>The Grexrom Museum Team.</b><br><br><a href="http://localhost:3000">Grexrom Museum</a>'
            })
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