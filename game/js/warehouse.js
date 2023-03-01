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
    localOreDict = getStorageItem("ore_data");
    console.log(localOreDict);
}

const playerDictCheck = checkStorageItem("player_data", playerDict)
console.log(playerDictCheck)

let localPlayerDict;
if (playerDictCheck) {
    localPlayerDict = getStorageItem("player_data");
    console.log(localPlayerDict);
} else {
    setStorageItem("player_data", playerDict);
    localPlayerDict = getStorageItem("player_data");
    console.log(localPlayerDict);
}

function splitString(str) {
    return str.split(',');
}

function updateBalance() {
    const moneyElement = document.getElementById("money");
    moneyElement.textContent = "◈ "+parseFloat(localPlayerDict.money).toFixed(2)
}

updateBalance()

// Update ore amounts and display them on the page
function updateOreAmount(planet, oreType, totalamount) {
    localOreDict[planet][oreType].amount = parseInt(totalamount);
    setStorageItem("ore_data", localOreDict);
    document.getElementById(`${oreType}-ore-amount`).innerHTML = totalamount;
}

updateOreAmount("novaria", "cryonite", 100);
updateOreAmount("novaria", "glacialite", 100);

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

document.addEventListener("mousemove", function(event) {
    // Check if the element has the data-hover-text attribute
    let hasTargetAttribute = false;
    try {
        hasTargetAttribute = event.target.hasAttribute("data-hover-text");
    } catch(error) {
        hasTargetAttribute = false;
    }
    if (hasTargetAttribute) {
        let hoverBox = document.getElementById("hover-box");
        const planetore = splitString(event.target.getAttribute("data-hover-text"))
        // Set the text of the box to the value of the data-hover-text attribute
        hoverBox.innerHTML = localOreDict[planetore[0]][planetore[1]].description;
        // Add a small delay to the box movement
        setTimeout(function() {
            // Position the box near the mouse cursor
            hoverBox.style.top = event.clientY + 20 + "px";
            hoverBox.style.left = event.clientX + 20 + "px";
            // Make the box visible
            hoverBox.style.display = "block";
        }, 10); // Delay time in milliseconds
    }
});
  
document.addEventListener("mouseout", function() {
    var hoverBox = document.getElementById("hover-box");
    // Hide the box when the mouse moves out of the window
    hoverBox.style.display = "none";
});
  