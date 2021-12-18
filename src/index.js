import { initializeApp } from "firebase/app";
import mapboxgl from "mapbox-gl";
import fc from "fc";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDBaFPV-2cqZA5QjlBhUPhHiwpjyHHSm3k",
  authDomain: "riadevigo-1a7e0.firebaseapp.com",
  projectId: "riadevigo-1a7e0",
  storageBucket: "riadevigo-1a7e0.appspot.com",
  messagingSenderId: "455312870518",
  appId: "1:455312870518:web:b99847fbb2b52aac3ea357",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

mapboxgl.accessToken =
  "pk.eyJ1IjoicG9ydG9jYXJvZG9zIiwiYSI6ImNqd3RxcGpxNjI2MmEzeWxlc3NwaHZxdGMifQ._c7VWyMFDHUH5HMUiBCVhA";

const map = new mapboxgl.Map({
  container: "map", // container ID
  style: "mapbox://styles/portocarodos/ckwutz4bee8a615p2tku759dq", // style URL
  center: [-8.756, 42.2564], //ria de vigo
  zoom: 12,
  preserveDrawingBuffer: true,
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
const marker1 = new mapboxgl.Marker()
  .setLngLat([-8.779283, 42.242736])
  .addTo(map);
const real = marker1.getLngLat();
console.log("DENTRO " + real);

// Create a default Marker, Tofino
const marker2 = new mapboxgl.Marker()
  .setLngLat([-8.778681, 42.228481])
  .addTo(map);
// Create a default Marker, Lousal
const marker3 = new mapboxgl.Marker()
  .setLngLat([-8.688919, 42.274717])
  .addTo(map);
// Create a default Marker, Bordeira
const marker4 = new mapboxgl.Marker()
  .setLngLat([-8.792236, 42.241011])
  .addTo(map);

// Add geolocate GPS control to the map and lat/log.
const geolocate = new mapboxgl.GeolocateControl({
  positionOptions: {
    enableHighAccuracy: true,
  },
  trackUserLocation: true,
  showUserHeading: true,
});

map.addControl(geolocate);
geolocate.on("geolocate", function (e) {
  let lon = e.coords.longitude;
  let lat = e.coords.latitude;
  let position = [lon, lat];
  console.log("POS " + position);
});

//full screen
map.addControl(new mapboxgl.FullscreenControl());

let ctx = fc(()=> {
  ctx.fillStyle='black'
  let items=[]
  for (let i = 0; i < 2; i++) {
      items.push({
          w:20+Math.random()*80,
          h:20+Math.random()*80
      })
  hbox(items,10)
  }
}, false)


let hbox=(items,space)=>{
  let x=space
  let y =space
  for (let i = 0; i < items.length; i++) {
      let item = items[i];
      ctx.fillRect(x,y,item.w,item.h)
      x+=item.w+space
  }
}

/* map.on('load', () => {
  map.addSource('canvas-source', {
  type: 'canvas',
  canvas: 'canvasID',
  coordinates: [
  [-8.779283, 42.242736],
  [-8.792236, 42.241011]
  ],
  // Set to true if the canvas source is animated. If the canvas is static, animate should be set to false to improve performance.
  animate: true
  });
   
  map.addLayer({
      id: 'canvas-layer',
      type: 'raster',
      source: 'canvas-source'
    });

}); */
