const axios = require('axios')

class APIHandler {
    constructor() {
        this.axiosApp = axios.create({ baseURL: 'https://collectionapi.metmuseum.org/public/collection/v1' })
    }
    getFullList() {
        return this.axiosApp.get('/objects')
    }
    getSingleArt(artId) {
        return this.axiosApp.get(`/objects/${artId}`)
    }
    getFilteredArt() {
        return this.axiosApp.get('/search?departmentId=13&isHighlight=true&hasImages=true&q=bc')
    }
    getMoreImportant() {
        return this.axiosApp.get('/search?departmentId=13&hasImages=true&isHighlight=true&q=ac')

    }
}

module.exports = APIHandler

