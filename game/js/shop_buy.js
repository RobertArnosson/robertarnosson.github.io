import { setStorageItem, getStorageItem, removeStorageItem, checkStorageItem } from '../js/storage.js';
import { oreDict } from '../data/oredata.js';

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

// Get all shop sections
const shopSections = document.querySelectorAll('.shop-section');

// Loop through each shop section
shopSections.forEach(shopSection => {
    function updateGridItems() {
        const gridItems = document.querySelectorAll('.grid-item');
        gridItems.forEach(gridItem => {
            // Get the data-planet-ore attribute value
            const planetOre = gridItem.getAttribute('data-planet-ore');
            // Split the attribute value into an array
            const planetOreArray = planetOre.split(', ');
            // Get the planet, orename, and item type
            const planet = planetOreArray[0];
            const orename = planetOreArray[1];
            const orenameArray = planetOreArray[1].split('-');
            const itemType = planetOreArray[2];
            // Generate the new ID
            const newId = `${planet}-${orename}-${itemType}`;
            // Set the new ID to the current grid item
            gridItem.id = newId;

            const oreNameCapitalized = orenameArray.map(str => str.charAt(0).toUpperCase() + str.slice(1)).join(' ');
        
            // Update the button text and data-item-id attribute
            const button = gridItem.querySelector('.buy-button');
            const buttonText = `Buy ${oreNameCapitalized}`;
            button.innerText = buttonText;
            button.setAttribute('data-item-id', newId);
            button.addEventListener('click', () => {
                console.log(`Clicked button to buy ${oreNameCapitalized}`);
                openPopup(oreNameCapitalized, "Buy This?", imageUrl)
            });
        
            // Update the h3 text to the ore name
            const h3 = gridItem.querySelector('h3');
            h3.innerText = oreNameCapitalized;

            const image = gridItem.querySelector('img');
            let imageUrl = `../img/${planet}/${itemType}/${oreNameCapitalized}.png`;
            const img = new Image();
            img.onload = () => {
                // Image is valid
                image.src = imageUrl;
            };
            img.onerror = () => {
                // Image is invalid
                image.src = '../img/template.png';
            };
            img.src = imageUrl;
        });
      }
      
      // Call the function once to update the grid items on page load
      updateGridItems();
});

const closePopupBtn = document.getElementById("close-btn-id").addEventListener("click", () => {
    closePopup()
})

function openPopup(title, message, imageSrc) {
    // Get the popup and its content
    var popup = document.querySelector('.popup');
  
    // Show the popup
    popup.style.display = 'block';
  
    // Set the title, message, and image based on the arguments
    document.getElementById('popup-title').textContent = title;
    document.getElementById('popup-message').textContent = message;
    document.getElementById('popup-img').src = imageSrc;
    window.onclick = function(event) {
        if (event.target == popup) {
            closePopup();
        }
    }
}

function closePopup() {
    // Get the popup
    var popup = document.querySelector('.popup');
  
    // Hide the popup
    popup.style.display = 'none';
}

const increase = document.getElementById("input-number-increment-id")
const decrease = document.getElementById("input-number-decrement-id")

increase.addEventListener("click", () => {
    increaseValue();
    console.log("+1")
})

decrease.addEventListener("click", () => {
    decreaseValue();
    console.log("-1")
})

function increaseValue() {
    const inputValueElement = document.getElementById("input-number-id")
    inputValueElement.value = parseInt(inputValueElement.value) + 1;
}

function decreaseValue() {
    const inputValueElement = document.getElementById("input-number-id")
    if (parseInt(inputValueElement.value) > 1) {
        inputValueElement.value = parseInt(inputValueElement.value) - 1;
    }
}