const router = require("express").Router();
const APIHandler = require("../services/APIHandler")
const API = new APIHandler()
const { isLoggedIn, checkRole } = require('../middlewere/route-guard')
const Comments = require('../models/Comment.model')
const User = require('../models/User.model')

let prevPage = 0
let nextPage = 0

// INDEX PAGE
router.get('/', (req, res, next) => {
    API
        .getMoreImportant()
        .then(response => {
            const idsArray = response.data.objectIDs
            const artworksPromises = idsArray.map(id => API.getSingleArt(id))

            return Promise.all(artworksPromises)
        })
        .then(artwoksInfo => {
            const filteredArtwoksInfo = artwoksInfo.map(artwork => {
                const info = {
                    id: artwork.data.objectID,
                    image: artwork.data.primaryImage,
                    title: artwork.data.title
                }
                return info
            })
            res.render('artworks/index-carrousel', { filteredArtwoksInfo })
        })
        .catch(err => next(err))
})

// ARTWORKS LIST
router.get("/artworks", (req, res, next) => {

    const { page } = req.query

    switch (page) {
        case '1':
            prevPage = 0
            nextPage = 12
            break;
        case '2':
            prevPage = 13
            nextPage = 12
            break;
        case '3':
            prevPage = 26
            nextPage = 12
            break;
        case '4':
            prevPage = 39
            nextPage = 12
            break;
        case '5':
            prevPage = 52
            nextPage = 12
            break;
        case '6':
            prevPage = 65
            nextPage = 12
            break;
        case '7':
            prevPage = 78
            nextPage = 12
            break;
        case '8':
            prevPage = 91
            nextPage = 12
            break;
        default:
            break;
    }

    API
        .getFilteredArt()
        .then(response => {
            const idsArray = response.data.objectIDs
            const filteredIds = idsArray.splice(prevPage, nextPage)
            const artworksPromises = filteredIds.map(id => API.getSingleArt(id))

            return Promise.all(artworksPromises)
        })
        .then(artworksInfo => {
            const filteredArtworksInfo = artworksInfo.map(artwork => {
                const info = {
                    id: artwork.data.objectID,
                    image: artwork.data.primaryImageSmall,
                    title: artwork.data.title,
                    period: artwork.data.period
                }
                return info
            })

            res.render('artworks/index-page', { filteredArtworksInfo, page })
        })
        .catch(err => next(err))
})

// ARTWORK INFO
router.get('/artwork/:id', isLoggedIn, (req, res, next) => {

    const { id } = req.params

    let artwork = {}

    API
        .getSingleArt(id)
        .then(data => {
            artwork = data.data
            return Comments.find({ artwork: id }).populate('user')
        })
        .then(comments => {
            artwork.comments = comments
            res.render('artworks/artwork-info', artwork)
        })
        .catch(error => next(error))
})

router.post('/artwork/:id', (req, res, next) => {
    const { id } = req.params
    const { _id: userId } = req.session.currentUser
    const { rating, text } = req.body

    Comments
        .create({ rating, text, user: userId, artwork: id })
        .then(() => res.redirect(`/artwork/${id}`))
        .catch(error => next(error))
})

router.post('/artwork/:id/favorite', isLoggedIn, (req, res, next) => {
    const { id } = req.params
    const { _id: userId, username } = req.session.currentUser

    if (!req.session.currentUser.favs.includes(id)) {
        User
            .findByIdAndUpdate(userId, { $push: { favs: id } })
            .then(() => res.redirect(`/profile/${username}`))
            .catch(error => next(error))
    }
    else {
        res.redirect(`/profile/${username}`)
    }
})

// ARTWORK EVENT
router.get('/expos', isLoggedIn, (req, res, next) => {

    API
        .getExpoArt()
        .then(response => {
            const idsArray = response.data.objectIDs
            const artworksPromises = idsArray.map(id => API.getSingleArt(id))

            return Promise.all(artworksPromises)
        })
        .then(artwoksInfo => {
            const filteredArtwoksInfo = artwoksInfo.map(artwork => {
                const info = {
                    image: artwork.data.primaryImage,
                    title: artwork.data.title,
                    period: artwork.data.period,
                    objectName: artwork.data.objectName,
                    objectDate: artwork.data.objectDate,
                    dimensions: artwork.data.dimensions
                }
                return info
            })

            res.render('artworks/artwork-expos', { filteredArtwoksInfo })
        })
        .catch(err => next(err))
})
module.exports = router;