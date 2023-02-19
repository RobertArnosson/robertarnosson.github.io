let notificationQueue = [];

function showNotification(type, title, message, imageSrc) {
  let notificationTemplate = document.getElementById('notification-template');
  let notificationContainer = document.getElementById('notification-container');

  // Clone the notification template
  let notificationBox = notificationTemplate.cloneNode(true);
  notificationBox.id = ''; // Remove the id to avoid duplication

  // Set the notification content and type
  let notificationImage = notificationBox.querySelector('#notification-image');
  let notificationTitle = notificationBox.querySelector('#notification-title');
  let notificationMessage = notificationBox.querySelector('#notification-message');
  notificationImage.src = imageSrc;
  notificationTitle.innerHTML = title;
  notificationMessage.innerHTML = message;
  notificationBox.classList.add(type);

  // Add the notification box to the queue and the container
  notificationQueue.push(notificationBox);
  notificationContainer.appendChild(notificationBox);

  // Show the notification
  showNextNotification();
}

function showNextNotification() {
  let notificationContainer = document.getElementById('notification-container');
  if (notificationQueue.length > 0) {
    // Move up the previous notifications
    let offset = 0;
    for (let i = notificationQueue.length - 2; i >= 0; i--) {
        let notificationBox = notificationQueue[i];
        let height = notificationBox.offsetHeight;
        notificationBox.style.bottom = `${offset + height + 25}px`;
        offset += height + 10;
    }

    // Show the next notification
    let notificationBox = notificationQueue[notificationQueue.length - 1];
    notificationBox.classList.add('show');
    setTimeout(function() {
        notificationBox.classList.remove('show');
        notificationContainer.removeChild(notificationBox);
        notificationQueue.pop();
        // Show the next notification in the queue
        //showNextNotification();
        }, 3000);
    }
}

  
  // Example usage:
  //showNotification('warning', 'New Message', 'You have a new message from John.', './game/textures/icons/warning.png');
  //showNotification('error', 'System Error', 'An unexpected error has occurred.', './game/textures/icons/error.png');
  //showNotification('notify', 'System Error', 'An unexpected error has occurred.', './game/textures/icons/questionmark.png');
  