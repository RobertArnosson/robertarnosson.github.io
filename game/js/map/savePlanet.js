import { setStorageItem, getStorageItem } from '../storage.js';

function savePlanet(planet) {
    setStorageItem("current_planet", planet);
    window.location.href=`../html/planets/map_${planet}.html`
    console.log(getStorageItem("current_planet"))
}

export { savePlanet }