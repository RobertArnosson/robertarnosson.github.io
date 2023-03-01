import { setStorageItem, getStorageItem, removeStorageItem, checkStorageItem } from '../storage.js';

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
    const playerData = getStorageItem("player_data")
    playerData.planet = planet
    setStorageItem("player_data", playerData);
    window.location.href=`../html/planets/map_${planet}.html`
    console.log(getStorageItem("player_data"))
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

const devDiv = document.getElementById("dev");

devDiv.addEventListener("click", () => {
    const mainpage = window.location.href;
    let splitUrl = mainpage.split("/");
    let newUrl = splitUrl.slice(0, 3).join("/")+"/";
    console.log(mainpage);
    console.log(newUrl);

    window.location.href = newUrl+"game/dev/dev.html"
});