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
    getFilterArt() {
        return this.axiosApp.get('/search?departmentId=13&hasImages=true&q=a')
    }
}

module.exports = APIHandler
