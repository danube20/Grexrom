let map
function initMap() {

    const { Map, Marker } = google.maps

    const map = new Map(
        document.getElementById('myMap'),
        {
            zoom: 17,
            center: { lat: 40.39197523347432, lng: -3.6978947847312122 },
        }
    )

    new Marker({
        position: { lat: 40.39197523347432, lng: -3.6978947847312122 },
        title: 'Matadero Madrid',
        map
    })
}