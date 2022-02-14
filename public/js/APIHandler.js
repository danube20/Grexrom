class museumApi {
    constructor(baseURL) {
        this.axiosApp = axios.create({ baseURL })
    }
    getFullList() {
        return this.axiosApp.get('/')
    }
}