let map, directionsService, directionsRenderer;

function initMap() {
    // Custom dark style to match the website theme
    const styledMapType = new google.maps.StyledMapType(
        [
            {
                "elementType": "geometry",
                "stylers": [{ "color": "#212121" }]
            },
            {
                "elementType": "labels.icon",
                "stylers": [{ "visibility": "off" }]
            },
            {
                "elementType": "labels.text.fill",
                "stylers": [{ "color": "#757575" }]
            },
            {
                "elementType": "labels.text.stroke",
                "stylers": [{ "color": "#212121" }]
            },
            {
                "featureType": "administrative",
                "elementType": "geometry",
                "stylers": [{ "color": "#757575" }]
            },
            {
                "featureType": "road",
                "elementType": "geometry.fill",
                "stylers": [{ "color": "#2c2c2c" }]
            },
            {
                "featureType": "road.highway",
                "elementType": "geometry",
                "stylers": [{ "color": "#3c3c3c" }]
            },
            {
                "featureType": "water",
                "elementType": "geometry",
                "stylers": [{ "color": "#000000" }]
            },
            {
                "featureType": "water",
                "elementType": "labels.text.fill",
                "stylers": [{ "color": "#3d3d3d" }]
            }
        ],
        { name: 'Dark Map' }
    );

    directionsService = new google.maps.DirectionsService();
    directionsRenderer = new google.maps.DirectionsRenderer();

    // Initialize the map with custom styles
    map = new google.maps.Map(document.getElementById('map'), {
        center: { lat: 37.7749, lng: -122.4194 }, // Default location
        zoom: 12,
        mapTypeControlOptions: {
            mapTypeIds: ['roadmap', 'satellite', 'hybrid', 'terrain', 'styled_map']
        }
    });

    // Apply the custom map style
    map.mapTypes.set('styled_map', styledMapType);
    map.setMapTypeId('styled_map');

    // Set the directions renderer on the map
    directionsRenderer.setMap(map);
}

// Function to calculate the route
function calculateRoute() {
    const origin = document.getElementById('origin').value;
    const destination = document.getElementById('destination').value;

    const request = {
        origin: origin,
        destination: destination,
        travelMode: 'DRIVING',
    };

    directionsService.route(request, (result, status) => {
        if (status === 'OK') {
            directionsRenderer.setDirections(result);
        } else {
            alert('Could not calculate route: ' + status);
        }
    });
}

// Call initMap to load the map
initMap();
