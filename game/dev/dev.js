import { setStorageItem, getStorageItem, removeStorageItem, checkStorageItem } from '../js/storage.js';
import { oreDict } from '../data/oredata.js';
import { playerDict } from '../data/playerdata.js';

import { hashString } from './hash.js';

let hasLoggedIn = false;

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

// Get the form and button elements
const loginButton = document.querySelector('#login-b');
const backButton = document.querySelector('#back-b');

// Add an event listener to the form submission
loginButton.addEventListener('click', function(event) {
    event.preventDefault(); // Prevent the form from submitting normally
    
    // Get the input values
    const username = document.querySelector('#username').value;
    const password = document.querySelector('#password').value;
    console.log(password)
    let passwordHashed;

    passwordHashed = hashString(password)
    console.log(passwordHashed)
    
    // Check if the input values match the expected values
    if (username === 'dev' && passwordHashed === 'ef260e9aa3c673af240d17a2660480361a8e081d1ffeca2a5ed0e3219fc18567') {
        // Redirect to the dev tools page if the credentials are correct
        document.querySelector('.container').style.display = "none";
        hasLoggedIn = true;
    } else {
        // Show an error message if the credentials are incorrect
        document.querySelector('.container').style.display = "felx";
        hasLoggedIn = true;
        alert('Invalid username or password');
    }
});

// Add an event listener to the back button click
backButton.addEventListener('click', function(event) {
    event.preventDefault(); // Prevent the link from navigating normally
    const mainpage = window.location.href;
    let splitUrl = mainpage.split("/");
    let newUrl = splitUrl.slice(0, 3).join("/")+"/";
    console.log(mainpage);
    console.log(newUrl);

    window.location.href = newUrl+"game/html/map_space.html"
});

function updateBalance() {
    const moneyElement = document.getElementById("money");
    moneyElement.textContent = "◈ "+parseFloat(localPlayerDict.money).toFixed(2)
}

updateBalance()

const addMoneyI = document.getElementById("add-money-i");
const addMoneyB = document.getElementById("add-money-b");
const removeMoneyB = document.getElementById("remove-money-b");

addMoneyB.addEventListener("click", () => {
    const amount = addMoneyI.value;
    if (hasLoggedIn) {
        localPlayerDict.money = parseInt(localPlayerDict.money) + parseInt(amount);
        setStorageItem("player_data", localPlayerDict)
    } else {
        alert("So you are cheating now?")
    }
    updateBalance()
    console.log(`Added ${amount} money to your account`)
});

removeMoneyB.addEventListener("click", () => {
    const amount = addMoneyI.value;
    localPlayerDict.money = parseFloat(localPlayerDict.money) - parseInt(amount);
    if (localPlayerDict.money < 0) {
        localPlayerDict.money = 0;
        console.log(`Removed the rest of the money from your account`);
    } else {
        console.log(`Removed ${amount} money from your account`);
    }
    setStorageItem("player_data", localPlayerDict)
    updateBalance()
});