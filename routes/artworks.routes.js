const router = require("express").Router();
const APIHandler = require("../services/APIHandler")
const API = new APIHandler()
const { isLoggedIn, checkRole } = require('../middlewere/route-guard')
const Comments = require('../models/Comment.model')

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
                    image: artwork.data.primaryImageSmall,
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

    // /artworks?page=3

    const { page } = req.query

    switch (page) {
        case '1':
            prevPage = 0
            nextPage = 12
            break;
        case '2':
            prevPage = 12
            nextPage = 24
            break;
        case '3':
            prevPage = 24
            nextPage = 36
            break;
        case '4':
            prevPage = 36
            nextPage = 48
            break;
        case '5':
            prevPage = 48
            nextPage = 60
            break;
        case '6':
            prevPage = 60
            nextPage = 72
            break;
        case '7':
            prevPage = 72
            nextPage = 84
            break;
        case '8':
            prevPage = 84
            nextPage = 96
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

// CHANGE NUMBER OF SHOWN ARTWORKS

// const prevBtn = document.getElementById('previousPage')
// const nextBtn = document.getElementById('nextPage')

// prevBtn.addEventListener('click', event => {
//     // if (prevPage >= 24) {
//     //     prevPage -= 12
//     //     nextPage -= 12
//     // }
//     // else {
//     //     return
//     // }
//     console.log('hola prev');
// })
// nextBtn.addEventListener('click', event => {
//     // if (nextPage >= 0 && nextPage <= 96) {
//     //     nextPage += 12
//     //     prevPage += 12
//     // }
//     // else {
//     //     return
//     // }
//     console.log('hola next');
// })

module.exports = router;