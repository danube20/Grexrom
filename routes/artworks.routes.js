const router = require("express").Router();
const APIHandler = require("../services/APIHandler")
const API = new APIHandler()


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

router.get('/artwork/:id', (req, res, next) => {
    const { id } = req.params

    API
        .getSingleArt(id)
        .then(data => {
            res.render('artworks/artwork-info', { data })
        })
        .catch(error => next(error))
})

module.exports = router;