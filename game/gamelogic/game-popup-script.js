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