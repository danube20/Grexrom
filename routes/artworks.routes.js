const router = require("express").Router();
const APIHandler = require("../services/APIHandler")
const API = new APIHandler()
const { isLoggedIn, checkRole } = require('../middlewere/route-guard')
const Comments = require('../models/Comment.model')


// INDEX PAGE
router.get("/", (req, res, next) => {
    API
        .getFilteredArt()
        .then(response => {
            const idsArray = response.data.objectIDs
            const filteredIds = idsArray.splice(0, 10)
            const artworksPromises = filteredIds.map(id => API.getSingleArt(id))

            return Promise.all(artworksPromises)
        })
        .then(artwoksInfo => {
            const filteredArtwoksInfo = artwoksInfo.map(artwork => {
                const info = {
                    id: artwork.data.objectID,
                    image: artwork.data.primaryImageSmall,
                    title: artwork.data.title,
                    period: artwork.data.period
                }
                return info
            })

            res.render('artworks/index-page', { filteredArtwoksInfo })
        })
        .catch(err => console.log(err))

});

// ARTWORK INFO

router.get('/artwork/:id', isLoggedIn, (req, res, next) => {
    const { id } = req.params

    let artwork = {}

    API
        .getSingleArt(id)
        .then(data => {
            artwork = data.data
            return Comments.find().populate('user')
        })
        .then(comments => {
            artwork.comments = comments
            res.render('artworks/artwork-info', artwork)
        })
        .catch(error => next(error))
})

router.post('/artwork/:id', (req, res, next) => {
    const { id } = req.params
    // const userId = req.session.currentUser._id
    const { rating, text, user } = req.body

    Comments
        .create({ rating, text, user, artwork: id })
        .then(() => res.redirect(`/artwork/${id}`))
        .catch(error => next(error))
})

module.exports = router;