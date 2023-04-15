const { isLoggedIn } = require('../middlewere/route-guard')
const User = require('../models/User.model')
const fileUploader = require('../config/cloudinary.config')
const APIHandler = require("../services/APIHandler")
const API = new APIHandler()
const { isAdmin, isOwned, isUser } = require('../utils')
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

    let data = null
    if (isOwned(username, req.session.currentUser.username) || isAdmin(req.session.currentUser) || isUser(req.session.currentUser)) {
        User
            .findOne({ username })
            .then(user => {
                data = user
                return user?.favs
            })
            .then(artworks => {
                if (artworks) {
                    const idsArray = artworks
                    const artworksPromises = idsArray.map(id => API.getSingleArt(id))

                    return Promise.all(artworksPromises)
                }
            })
            .then(artworksInfo => {
                let filteredArtworksInfo
                if (artworksInfo) {
                    filteredArtworksInfo = artworksInfo.map(artwork => {
                        const info = {
                            id: artwork.data.objectID,
                            image: artwork.data.primaryImageSmall,
                            title: artwork.data.title,
                            period: artwork.data.period
                        }
                        return info
                    })
                }
                !data ? res.render('user/user-not-found') : res.render('user/user-profile', {
                    filteredArtworksInfo,
                    user: data,
                    isOwned: isOwned(username, req.session.currentUser.username) || isAdmin(req.session.currentUser)
                })
            })
            .catch(error => next(error))
    }

})

router.get('/profile/:username/edit-info', isLoggedIn, (req, res, next) => {
    const { username } = req.params

    if (isOwned(username, req.session.currentUser.username) || isAdmin(req.session.currentUser)) {
        User
            .findOne({ username })
            .then(data => res.render('user/profile-form', data))
            .catch(error => next(error))
    }
    else {
        res.redirect(`/profile/${username}`)
    }
})

router.post('/profile/:username/edit-info', fileUploader.single('imgUrl'), isLoggedIn, (req, res, next) => {
    const { username } = req.params
    const { fullName, biography } = req.body

    if (isOwned(username, req.session.currentUser.username) || isAdmin(req.session.currentUser)) {
        User
            .findOneAndUpdate({ username }, { fullName, biography, imgUrl: req.file.path })
            .then(data => {
                console.log(data)
                res.redirect(`/profile/${username}`)
            })
            .catch(error => next(error))
    }
})

router.post('/artwork/:id/delete', isLoggedIn, (req, res, next) => {
    const { id } = req.params
    const { username } = req.session.currentUser

    User
        .findOneAndUpdate({ username }, { $pull: { favs: id } })
        .then(() => res.redirect(`/profile/${username}`))
        .catch(error => next(error))
})
module.exports = router