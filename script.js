const UploadImage = document.getElementById('file-upload');

UploadImage.addEventListener('change', (event) => {
    const file = event.target.files[0];
    if (file) {
        if (!file.type.startsWith('image/')) {
            mess = "Please upload an image file."
            Notifyme(mess, statas = false)
            return;
        }

        const reader = new FileReader();
        reader.onload = function (e) {
            const img = new Image();
            img.onload = function () {
                if (img.width > img.height) {
                    document.getElementById('file-preview').innerHTML = '<img src="' + e.target.result + '" alt="Uploaded Image" width="100%" height="100%" class="mybanner">';
                    document.getElementById('file-preview').style.display = 'block';
                    mess = "Sucessfuly chnage banner"
                    Notifyme(mess, statas = true)
                } else {
                    mess = "Please upload Landscape image"
                    Notifyme(mess, statas = false)
                }
            };
            img.src = e.target.result;
        };
        reader.readAsDataURL(file);
    }
});


// edit profile section

const EditBtn = document.getElementById('editBtn')

EditBtn.addEventListener('click', function () {
    nameInput.value = nameDisplay.textContent;
    document.getElementById('nameDisplay').style.display = 'none';
    document.getElementById('nameInput').style.display = 'block';
    document.getElementById('saveBtn').style.visibility = '';
});

document.getElementById('saveBtn').addEventListener('click', function () {
    var newName = document.getElementById('nameInput').value;
    if (newName.trim() === '') {
        mess = "Please Fill the Input text"
        Notifyme(mess, statas = false)
        return;
    }
    document.getElementById('nameDisplay').innerHTML = `<h3>${newName}</h3>`;
    document.getElementById('nameDisplay').style.display = 'block';
    document.getElementById('nameInput').style.display = 'none';
    document.getElementById('saveBtn').style.visibility = 'hidden';

    mess = "Sucessfuly chnage Name"
    Notifyme(mess, statas = true)
});







// Queue to hold notifications
const notificationQueue = [];
// Flag to indicate if a notification is currently being displayed
let isDisplayingNotification = false;

function Notifyme(message, status) {
    // Push the new notification into the queue
    notificationQueue.push({ message, status });

    // If no notification is currently being displayed, display the next one
    if (!isDisplayingNotification) {
        displayNextNotification();
    }
}

function displayNextNotification() {
    // If there are notifications in the queue
    if (notificationQueue.length > 0) {
        const { message, status } = notificationQueue.shift();
        const notifyBox = document.querySelector('.message-container');
        const messageElement = document.querySelector('.notify-mess-text');
        const messageAlertImg = document.querySelector('.message-container img');

        notifyBox.style.visibility = 'visible'; // Set visibility to visible

        messageElement.innerHTML = `<p class="notify-mess-text">${message}</p>`;

        if (status) {
            messageAlertImg.src = '/assets/icons/success.svg';
        } else {
            messageAlertImg.src = '/assets/icons/dangerous.svg';
        }

        // Set the flag to indicate that a notification is being displayed
        isDisplayingNotification = true;

        setTimeout(() => {
            // Hide the notification after a delay
            notifyBox.style.visibility = 'hidden';
            messageElement.innerHTML = ''; // Clear message
            messageAlertImg.src = ''; // Clear image source

            // Reset the flag to indicate that no notification is being displayed
            isDisplayingNotification = false;

            // Display the next notification in the queue if there's only one left
            if (notificationQueue.length === 1) {
                displayNextNotification();
            } else if (notificationQueue.length > 1) {
                // Clear the queue if there are more than one notification
                notificationQueue.splice(0, notificationQueue.length);
            }
        }, 4000);
    } else {
        // Reset the flag to indicate that no notification is being displayed
        isDisplayingNotification = false;
    }
}