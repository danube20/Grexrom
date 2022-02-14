const router = require("express").Router();
const APIHandler = require("../services/APIHandler")
const API = new APIHandler()

const objectsIds = ['258464', '256571', '251929', '256126', '257603', '255391', '248140', '249223', '251838', '248483', '253056', '255367', '253555', '247931', '253557', '254864', '254871', '254168', '254178', '248299', '254869', '254906', '254865', '738889', '247925', '246585', '247229', '247349', '254911', '252890', '254478', '242010', '253505', '254589', '241307', '251428', '251268', '246931', '253373', '253566', '244557', '255154', '251493', '247926', '246992', '251050', '256974', '253370', '250946', '241014', '248891', '257640', '254213', '248268', '249222', '242408', '248008', '254825', '253046', '255408', '253050', '254587', '250951', '252452', '247395', '255417', '241004', '247967', '241098', '247326', '242041', '248892', '258424', '249228', '247524', '257639', '254508', '248689', '246701', '253483', '248499', '256543', '242311', '248138', '250744', '249091', '254613', '248500', '247000', '247001', '255973', '254547', '255275', '248722', '252887', '254468', '252581', '257580', '248175', '252927', '255251']

/* GET home page */

// let
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

            res.render('index', { filteredArtwoksInfo })
            // console.log('El array de respuestas', filteredArtwoksInfo)
        })
        .catch(err => console.log(err))

});

module.exports = router;