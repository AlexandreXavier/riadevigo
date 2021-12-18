
import { initializeApp } from "firebase/app";
import mapboxgl from 'mapbox-gl';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDBaFPV-2cqZA5QjlBhUPhHiwpjyHHSm3k",
  authDomain: "riadevigo-1a7e0.firebaseapp.com",
  projectId: "riadevigo-1a7e0",
  storageBucket: "riadevigo-1a7e0.appspot.com",
  messagingSenderId: "455312870518",
  appId: "1:455312870518:web:b99847fbb2b52aac3ea357"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

mapboxgl.accessToken = 'pk.eyJ1IjoicG9ydG9jYXJvZG9zIiwiYSI6ImNqd3RxcGpxNjI2MmEzeWxlc3NwaHZxdGMifQ._c7VWyMFDHUH5HMUiBCVhA';

const map = new mapboxgl.Map({
    container: 'map', // container ID
    style: 'mapbox://styles/portocarodos/ckwutz4bee8a615p2tku759dq', // style URL
    center: [-8.756000, 42.256400],//ria de vigo
    //pitch: 60,
    //bearing: -20,
    zoom: 12 ,
    preserveDrawingBuffer: true
});


// disable map rotation using right click + drag
map.dragRotate.disable();
//enable double click
map.doubleClickZoom.enable();
// disable map rotation using touch rotation gesture
map.touchZoomRotate.disableRotation();
// constrain zoom to max 15 and min 12
map.setMaxZoom(17);
map.setMinZoom(12.25);

// // Create a default gps //salgueiron Lat:42.242736°  Log: -8.779283°
 const marker1 = new mapboxgl.Marker({ color: 'red'})
 .setLngLat([-8.779283,42.242736]) 
 .addTo(map);

 const real = marker1.getLngLat();
 console.log("DENTRO "+real);

// // Create a default Marker, Tofino
// const marker2 = new mapboxgl.Marker({ color: 'green'})
// .setLngLat([-8.778681,42.228481])
// .addTo(map);
// // Create a default Marker, Lousal
// const marker3 = new mapboxgl.Marker({ color: 'blue'})
// .setLngLat([ -8.688919,42.274717])
// .addTo(map);
// // Create a default Marker, Bordeira
// const marker4 = new mapboxgl.Marker({ color: 'red'})
// .setLngLat([ -8.792236,42.241011])
// .addTo(map);



// Add geolocate GPS control to the map.
map.addControl(
    new mapboxgl.GeolocateControl({
    positionOptions: {
    enableHighAccuracy: true
    },
    // When active the map will receive updates to the device's location as it changes.
    trackUserLocation: true,
    // Draw an arrow next to the location dot to indicate which direction the device is heading.
    showUserHeading: true
    })
);

// Add the control to the map.
// map.addControl(geolocate);
// // Set an event listener that fires
// // when a geolocate event occurs.
// geolocate.on('geolocate', () => {
// console.log('A geolocate event has occurred.');
// });




// const size = 200;
// const pulsingDot = {
//     width: size,
//     height: size,
//     data: new Uint8Array(size * size * 4),
     
//     // When the layer is added to the map,
//     // get the rendering context for the map canvas.
//     onAdd: function () {
//     const canvas = document.createElement('canvas');
//     canvas.width = this.width;
//     canvas.height = this.height;
//     this.context = canvas.getContext('2d');
//     },
     
//     // Call once before every frame where the icon will be used.
//     render: function () {
//     const duration = 1000;
//     const t = (performance.now() % duration) / duration;
     
//     const radius = (size / 2) * 0.3;
//     const outerRadius = (size / 2) * 0.7 * t + radius;
//     const context = this.context;
     
//     // Draw the outer circle.
//     context.clearRect(0, 0, this.width, this.height);
//     context.beginPath();
//     context.arc(
//     this.width / 2,
//     this.height / 2,
//     outerRadius,
//     0,
//     Math.PI * 2
//     );
//     context.fillStyle = `rgba(255, 200, 200, ${1 - t})`;
//     context.fill();
     
//     // Draw the inner circle.
//     context.beginPath();
//     context.arc(
//     this.width / 2,
//     this.height / 2,
//     radius,
//     0,
//     Math.PI * 2
//     );
//     context.fillStyle = 'rgba(255, 100, 100, 1)';
//     context.strokeStyle = 'white';
//     context.lineWidth = 2 + 4 * (1 - t);
//     context.fill();
//     context.stroke();
     
//     // Update this image's data with data from the canvas.
//     this.data = context.getImageData(
//     0,
//     0,
//     this.width,
//     this.height
//     ).data;
     
//     // Continuously repaint the map, resulting
//     // in the smooth animation of the dot.
//     map.triggerRepaint();
     
//     // Return `true` to let the map know that the image was updated.
//     return true;
//     }
//     };

// map.on('load', () => {
//         map.addImage('pulsing-dot', pulsingDot, { pixelRatio: 2 });
         
//         map.addSource('dot-point', {
//             'type': 'geojson',
//             'data': {
//             'type': 'FeatureCollection',
//             'features': [
//             {
//             'type': 'Feature',
//             'geometry': {
//             'type': 'Point',
//             'coordinates': [-8.792236,42.251011] // icon position [lng, lat]
//             }
//         }
//         ]
//         }
//         });
//         map.addLayer({
//             'id': 'layer-with-pulsing-dot',
//             'type': 'symbol',
//             'source': 'dot-point',
//             'layout': {
//             'icon-image': 'pulsing-dot'
//             }
//         });
// });

//Marker amovivel with coordenates Lat Long
//const marker = new mapboxgl.Marker({draggable: true}).setLngLat([-8.688919,42.274717]).addTo(map);
// function onDragEnd() {
//     const lngLat = marker.getLngLat();
//     coordinates.style.display = 'block';
//     coordinates.innerHTML = `Long: ${lngLat.lng}<br />Lat: ${lngLat.lat}`;
// }
// marker.on('dragend', onDragEnd);
//  


map.on('load', () => {

    map.addSource('places', {
    'type': 'geojson',
    'data': {
    'type': 'FeatureCollection',
    'features': [
    {
    'type': 'Feature',
    'properties': {
    'description':
    'Lousal'
    },
    'geometry': {
    'type': 'Point',
    'coordinates': [-8.688919,42.274717]
    }
    },
    {
    'type': 'Feature',
    'properties': {
    'description':
    'Tofino'
    },
    'geometry': {
    'type': 'Point',
    'coordinates': [-8.778681,42.228481]
    }
    }
    ]
    }
    });

    // Add a layer showing the places.
    map.addLayer({
            'id': 'places',
            'type': 'circle',
            'source': 'places',
            'paint': {
            'circle-color': '#ff0000',
            'circle-radius': 6,
        }
    });
     
    // Create a popup, but don't add it to the map yet.
    const popup = new mapboxgl.Popup({
        closeButton: false,
        closeOnClick: false
    });
     
    map.on('mouseenter', 'places', (e) => {
        // Change the cursor style as a UI indicator.
        map.getCanvas().style.cursor = 'pointer';
     
        // Copy coordinates array.
        const coordinates = e.features[0].geometry.coordinates.slice();
        const description = e.features[0].properties.description;
     
        // Ensure that if the map is zoomed out such that multiple
        // copies of the feature are visible, the popup appears
        // over the copy being pointed to.
        while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
        coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
        }
     
        // Populate the popup and set its coordinates
        // based on the feature found.
        popup.setLngLat(coordinates).setHTML(description).addTo(map);
    });
     
    map.on('mouseleave', 'places', () => {
        map.getCanvas().style.cursor = '';
        popup.remove();
    });

    

});

// Example of a MapDataEvent of type "sourcedata"
map.on('sourcedata', (e) => {
    //console.log(e);
    });

map.on('move', () => {
    this.setState({
    lng: map.getCenter().lng.toFixed(4),
    lat: map.getCenter().lat.toFixed(4),
    zoom: map.getZoom().toFixed(2)
    });
    });

//full screen
map.addControl(new mapboxgl.FullscreenControl());





 