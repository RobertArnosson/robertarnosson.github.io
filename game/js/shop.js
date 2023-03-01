import { setStorageItem, getStorageItem, removeStorageItem, checkStorageItem } from '../js/storage.js';
import { oreDict } from '../data/oredata.js';
import { playerDict } from '../data/playerdata.js';

//removeStorageItem("ore_data")

/*
CODE TO SAVE AND USE

Single coin hollow
&#9920;

Double coin hollow
&#9921;

Single coin full
&#9922;

Double coin full
&#9923;

Hammers in cross
&#9874;

Pickaxe
&#9874;

Cross sign
&#9938;

Truck
&#9951;

Danger sign
&#9888;

Thin arrow left
&#10229;

Thin arrow right
&#10230;


*/

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

function redirect(side) {
    if (side == "buy") {
        window.location.href = "../html/shop_buy.html"
    } else if (side == "sell") {
        window.location.href = "../html/shop_sell.html"
    }
}

const backbutton = document.getElementById("back");

backbutton.addEventListener("click", () => {
    const mainpage = window.location.href;
    let splitUrl = mainpage.split("/");
    let newUrl = splitUrl.slice(0, 3).join("/")+"/";
    console.log(mainpage);
    console.log(newUrl);

    const planetpage = `game/html/planets/map_${localPlayerDict.planet}.html`

    window.location.href = newUrl+planetpage;

});

const buybutton = document.getElementById("buy");
const sellbutton = document.getElementById("sell");

buybutton.addEventListener("click", () => {
    redirect("buy");
});

sellbutton.addEventListener("click", () => {
    redirect("sell");
});