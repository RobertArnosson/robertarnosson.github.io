import { setStorageItem, getStorageItem } from '../storage.js';

// Get the URL of the last page visited, if it exists
const planet = getStorageItem('currentPlanet');

// If a last page URL was found, output it to the console
if (planet) {
	console.log('Current Planet: ' + planet);
}

// Flag variable to keep track of page reloads
let isPageReloading = false;

// Listen for the 'beforeunload' event and save the current page URL
window.addEventListener('beforeunload', function(event) {
	// Check if the page is being reloaded
	if (event.currentTarget.performance.navigation.type === 1) {
		isPageReloading = true;
	} else {
		isPageReloading = false;
	}

	// Save the current page URL to local storage if not reloading
	if (!isPageReloading) {
		const currentUrl = window.location.href;
		setStorageItem('lastPage', currentUrl);
	}
});