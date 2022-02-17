let map
function initMap() {

    const { Map, Marker } = google.maps

    const map = new Map(
        document.getElementById('myMap'),
        {
            zoom: 17,
            center: { lat: 40.392272578078725, lng: -3.6980044876819416 },
        }
    )

    new Marker({
        position: { lat: 40.392272578078725, lng: -3.6980044876819416 },
        title: 'Ironhack',
        map
    })
}