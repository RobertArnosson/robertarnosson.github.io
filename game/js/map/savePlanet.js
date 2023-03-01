import { setStorageItem, getStorageItem, removeStorageItem, checkStorageItem } from '../storage.js';

function savePlanet(planet) {
    const playerData = getStorageItem("player_data")
    playerData.planet = planet
    setStorageItem("player_data", playerData);
    window.location.href=`../html/planets/map_${planet}.html`
    removeStorageItem("current_planet")
}

export { savePlanet }