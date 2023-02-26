import { setStorageItem, getStorageItem, removeStorageItem, checkStorageItem } from '../js/storage.js';
import { oreDict } from '../data/oredata.js';
import { playerDict } from '../data/playerdata.js';

//removeStorageItem("ore_data")

console.log(oreDict)

const oreDictCheck = checkStorageItem("ore_data", oreDict)
console.log(oreDictCheck)

let localOreDict;
if (oreDictCheck) {
    localOreDict = getStorageItem("ore_data");
    console.log(localOreDict);
} else {
    setStorageItem("ore_data", oreDict);
}

const playerDictCheck = checkStorageItem("player_data", playerDict)
console.log(playerDictCheck)

let localPlayerDict;
if (playerDictCheck) {
    localPlayerDict = getStorageItem("player_data");
    console.log(localPlayerDict);
} else {
    setStorageItem("player_data", playerDict);
}

function updateBalance() {
    const moneyElement = document.getElementById("money");
    moneyElement.textContent = "◈ "+parseFloat(localPlayerDict.money).toFixed(2)
}

updateBalance()

// Update ore amounts and display them on the page
function updateOreAmount(oreType, planet, amount) {
    localOreDict[planet][oreType][amount] = amount
    setStorageItem("ore_data", localOreDict);
    document.getElementById(`${oreType}-ore-amount`).innerHTML = amount;
}

updateOreAmount("cryonite", "novaria", 100);
updateOreAmount("glacialite", "novaria", 100);