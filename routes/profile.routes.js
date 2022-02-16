const { isLoggedIn } = require('../middlewere/route-guard')
const User = require('../models/User.model')
const fileUploader = require('../config/cloudinary.config')

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
            !data ? res.render('user/user-not-found') : res.render('user/user-profile', data)
        })
        .catch(error => next(error))
})

router.get('/profile/:username/edit-info', isLoggedIn, (req, res, next) => {
    const { username } = req.params

    User
        .findOne({ username })
        .then(data => res.render('user/profile-form', data))
        .catch(error => next(error))

})

router.post('/profile/:username/edit-info', fileUploader.single('imgUrl'), isLoggedIn, (req, res, next) => {
    const { username } = req.params
    const { fullName, biography } = req.body

    User
        .findOneAndUpdate({ username }, { fullName, biography, imgUrl: req.file.path })
        .then(data => {
            console.log(data)
            res.redirect(`/profile/${username}`)
        })
        .catch(error => next(error))
})

module.exports = router