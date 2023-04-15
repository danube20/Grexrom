const router = require('express').Router()
const APIHandler = require('../services/APIHandler')
const API = new APIHandler()
const { isLoggedIn } = require('../middlewere/route-guard')
const Comments = require('../models/Comment.model')
const User = require('../models/User.model')

// INDEX PAGE
router.get('/', (req, res, next) => {
  API.getMoreImportant()
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
router.get('/artworks', (req, res, next) => {
  const { page } = req.query
  let totalPages = 1

  API.getFilteredArt()
    .then(response => {
      const idsArray = response.data.objectIDs
      const arrayChunks = idsArray.reduce((resultArray, item, index) => {
        const chunk = Math.floor(index / 12)
        resultArray[chunk] = [].concat(resultArray[chunk] || [], item)
        return resultArray
      }, [])

      totalPages = arrayChunks.length
      const filteredIds = arrayChunks[page - 1]
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

      res.render('artworks/index-page', { filteredArtworksInfo, page, totalPages })
    })
    .catch(err => next(err))
})

// ARTWORK INFO
router.get('/artwork/:id', isLoggedIn, (req, res, next) => {
  const { id } = req.params

  let artwork = {}

  API.getSingleArt(id)
    .then(data => {
      artwork = data.data
      return Comments.find({ artwork: id }).populate('user')
    })
    .then(comments => {
      const filteredComment = comments.map(elm => {
        const info = {
          user: elm.user,
          date: elm.date.toString().slice(4, 21),
          rating: elm.rating,
          text: elm.text
        }
        return info
      })
      artwork.comments = filteredComment
      artwork.commentLength = comments.length
      res.render('artworks/artwork-info', artwork)
    })
    .catch(error => next(error))
})

router.post('/artwork/:id', (req, res, next) => {
  const { id } = req.params
  const { _id: userId } = req.session.currentUser
  const { rating, text } = req.body

  Comments.create({ rating, text, user: userId, artwork: id })
    .then(() => res.redirect(`/artwork/${id}`))
    .catch(error => next(error))
})

router.post('/artwork/:id/favorite', isLoggedIn, (req, res, next) => {
  const { id } = req.params
  const { _id: userId, username } = req.session.currentUser

  User.findById(userId)
    .then(user => {
      if (!user.favs.includes(id)) {
        User.findByIdAndUpdate(userId, { $push: { favs: id } })
      }

      res.redirect(`/profile/${username}`)
    })
    .catch(error => next(error))
})

// ARTWORK EVENT
router.get('/expos', isLoggedIn, (req, res, next) => {
  API.getExpoArt()
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
module.exports = router
