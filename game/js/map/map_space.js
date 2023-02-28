import { setStorageItem, getStorageItem } from '../storage.js';

/* Ring radius */
var radius = 330;

/* Number of markers */
var numMarkers = 10;

/* Calculate the angle between markers */
var angle = (2 * Math.PI) / numMarkers;

/* Loop through each marker and position it on the ring */
for (var i = 1; i <= numMarkers; i++) {
    var marker = document.getElementById("marker-" + i);
    var x = radius * Math.cos((i - 2) * angle);
    var y = radius * Math.sin((i - 2) * angle);
    marker.style.left = "calc(50vw - 64px + " + x + "px)";
    marker.style.top = "calc(50vh - 64px + " + y + "px)";
}

function savePlanet(planet) {
    setStorageItem("current_planet", planet);
    window.location.href=`../html/planets/map_${planet}.html`
    console.log(getStorageItem("current_planet"))
}

let markers = []

for (let i = 1; i <= numMarkers; i++) {
    const currmarker = document.getElementById("marker-" + i)
    const planet = currmarker.getAttribute("data-planet");
    markers.push(currmarker);
    currmarker.addEventListener("click", () => {
        savePlanet(planet);
        console.log("Saved planet: "+planet)
    })
}