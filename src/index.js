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
  //style: "mapbox://styles/portocarodos/ckwutz4bee8a615p2tku759dq", // style URL
  style: "mapbox://styles/mapbox/streets-v11",
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

// Create a default gps //salgueiron Lat:42.242736°  Log: -8.779283°
const marker1 = new mapboxgl.Marker()
  .setLngLat([-8.779283, 42.242736])
  .addTo(map);
const real = marker1.getLngLat();

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

//full screen
map.addControl(new mapboxgl.FullscreenControl());

var geolocate = new mapboxgl.GeolocateControl({
  positionOptions: { enableHighAccuracy: true },
  trackUserLocation: true,
  showUserHeading: true
});

map.addControl(geolocate);
geolocate.on("geolocate", function (e) {
  var lon = e.coords.longitude;
  var lat = e.coords.latitude;
  var position = [lon, lat];
  console.log("POSICAO "+position);
});

//incorporate vector features to canvas
let ctx = fc(() => {
  ctx.fillStyle = "black";
  let items = [];
  for (let i = 0; i < 2; i++) {
    items.push({
      w: 20 + Math.random() * 80,
      h: 20 + Math.random() * 80,
    });
    hbox(items, 10);
  }
}, false);

let hbox = (items, space) => {
  let x = space;
  let y = space;
  for (let i = 0; i < items.length; i++) {
    let item = items[i];
    ctx.fillRect(x, y, item.w, item.h);
    x += item.w + space;
  }
};

const size = 200;
const pulsingDot = {
  width: size,
  height: size,
  data: new Uint8Array(size * size * 4),

  // When the layer is added to the map,
  // get the rendering context for the map canvas.
  onAdd: function () {
    const canvas = document.createElement("canvas");
    canvas.width = this.width;
    canvas.height = this.height;
    this.context = canvas.getContext("2d");
  },

  // Call once before every frame where the icon will be used.
  render: function () {
    const duration = 1000;
    const t = (performance.now() % duration) / duration;

    const radius = (size / 2) * 0.3;
    const outerRadius = (size / 2) * 0.7 * t + radius;
    const context = this.context;

    // Draw the outer circle.
    context.clearRect(0, 0, this.width, this.height);
    context.beginPath();
    context.arc(this.width / 2, this.height / 2, outerRadius, 0, Math.PI * 2);
    context.fillStyle = `rgba(255, 200, 200, ${1 - t})`;
    context.fill();

    // Draw the inner circle.
    context.beginPath();
    context.arc(this.width / 2, this.height / 2, radius, 0, Math.PI * 2);
    context.fillStyle = "rgba(255, 100, 100, 1)";
    context.strokeStyle = "white";
    context.lineWidth = 2 + 4 * (1 - t);
    context.fill();
    context.stroke();

    // Update this image's data with data from the canvas.
    this.data = context.getImageData(0, 0, this.width, this.height).data;

    // Continuously repaint the map, resulting
    // in the smooth animation of the dot.
    map.triggerRepaint();

    // Return `true` to let the map know that the image was updated.
    return true;
  },
};

map.on("load", () => {
  map.addImage("pulsing-dot", pulsingDot, { pixelRatio: 2 });

  map.addSource("dot-point", {
    type: "geojson",
    data: {
      type: "FeatureCollection",
      features: [
        {
          type: "Feature",
          geometry: {
            type: "Point",
            coordinates: [-8.688919, 42.274717], // icon position [lng, lat]
          },
        },
        {
          type: "Feature",
          geometry: {
            type: "Point",
            coordinates: [-8.778681, 42.228481], // icon position [lng, lat]
          },
        },
        {
          type: "Feature",
          geometry: {
            type: "Point",
            coordinates: [-8.792236, 42.241011], // icon position [lng, lat]
          },
        },
      ],
    },
  });
  map.addLayer({
    id: "layer-with-pulsing-dot",
    type: "symbol",
    source: "dot-point",
    layout: {
      "icon-image": "pulsing-dot",
    },
  });
});
