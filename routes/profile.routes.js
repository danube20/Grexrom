const { isLoggedIn } = require('../middlewere/route-guard')
const User = require('../models/User.model')

const router = require('express').Router()

// USER PROFILE

router.get('/profile', isLoggedIn, (req, res, next) => {
    const { username } = req.session.currentUser

    User
        .findOne({ username })
        .then(data => res.redirect(`/profile/${data.username}`))
        .catch(error => next(error))
})

router.get('/profile/:username', isLoggedIn, (req, res, next) => {
    const { username } = req.params

    User
        .findOne({ username })
        .then(data => {
            if (!data) {
                res.render('user/user-not-found')
            }
            else {
                res.render('user/user-profile', data)
            }
        })
        .catch(error => next(error))
})

module.exports = router