const UploadImageBanner = document.getElementById('file-upload-banner');
const UploadImageProfile = document.getElementById('file-upload-profile');



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
            messageAlertImg.src = './assets/icons/success.svg';
        } else {
            messageAlertImg.src = './assets/icons/dangerous.svg';
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


let DownloadAccess = true

UploadImageBanner.addEventListener('change', (event1) => {
    const FilePreviewBanner = document.getElementById('file-preview-banner')
    UploadImageFunction(event1, FilePreviewBanner, ImageWillBe = "banner")

});

UploadImageProfile.addEventListener('change', (event2) => {
    const FilePrevireProfile = document.getElementById('file-preview-profile')
    UploadImageFunction(event2, FilePrevireProfile, ImageWillBe = "profile")
})


function UploadImageFunction(event, FilePreview, ImageWillBe) {

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
                if (ImageWillBe == "banner") {
                    if (img.width > img.height) {
                        FilePreview.innerHTML = '<img src="' + e.target.result + '" alt="Uploaded Image" width="100%" height="100%" class="mybanner">';
                        FilePreview.style.display = 'block';
                        mess = "Sucessfuly chnage banner"
                        Notifyme(mess, statas = true)
                    } else {
                        mess = "Please upload Landscape image"
                        Notifyme(mess, statas = false)
                    }
                }
                if (ImageWillBe == "profile") {
                    if (img.width == img.height) {
                        FilePreview.innerHTML = '<img src="' + e.target.result + '" alt="Uploaded Image" width="100%" height="100%" class="myprofile">';
                        FilePreview.style.display = 'block';
                        mess = "Sucessfuly chnage proffile"
                        Notifyme(mess, statas = true)
                    }
                    else {
                        mess = "Image Must be Squre"
                        Notifyme(mess, statas = false)
                    }

                }
            };
            img.src = e.target.result;
        };
        reader.readAsDataURL(file);
    }
}


// edit profile section
function handleEditInformation(editBtnId, nameInputId, saveBtnId, nameDisplayId, textFormat, FunctionWorkOn) {
    const EditBtnProfile = document.getElementById(editBtnId);
    const nameInputProfile = document.getElementById(nameInputId);
    const SaveBtnProfile = document.getElementById(saveBtnId);
    const nameDisplay = document.getElementById(nameDisplayId);
    let mess; // Declare mess variable here

    EditBtnProfile.addEventListener('click', function () {
        DownloadAccess = false
        nameInputProfile.value = nameDisplay.textContent.trim();
        nameDisplay.style.display = 'none';
        nameInputProfile.style.display = 'block';
        SaveBtnProfile.style.display = 'block';

        setTimeout(function () {
            nameInputProfile.focus();
            nameInputProfile.select();
        }, 0);
    });

    SaveBtnProfile.addEventListener('click', function () {
        DownloadAccess = true
        var newName = nameInputProfile.value;
        if (newName.trim() === '') {
            mess = `Please Fill the ${FunctionWorkOn}`
            Notifyme(mess, statas = false)
        }
        else {
            if (FunctionWorkOn == 'Email') {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(newName)) {
                    mess = "Please enter a valid email address";
                    Notifyme(mess, statas = false);
                    return;
                }
            }

            nameDisplay.innerHTML = `<${textFormat[0]}>${newName}</${textFormat[1]}>`;
            nameDisplay.style.display = 'block';
            nameInputProfile.style.display = 'none';
            SaveBtnProfile.style.display = 'none';

            mess = `Successfully changed ${FunctionWorkOn}`;
            Notifyme(mess, statas = true);
        }


    });
}


// for profile section
handleEditInformation('editBtnProfile', 'nameInputProfile', 'saveBtnProfile', 'nameDisplay', ['h3', 'h3'], 'Name');
// for about section
handleEditInformation('editBtnAbout', 'AboutInput', 'saveBtnAbout', 'AboutDisplay', 'p', 'About');
// for contact section 
handleEditInformation('editBtnContact', 'ContactInput', 'saveBtnContact', 'ContactDisplay', ['a href="mailto:example@gmail.com"', 'a'], 'Email')
// profile edit section is completed





// for download canvas 

const ElementCapture = document.querySelector('.container');
const DownloadBtn = document.querySelector('#downloadBtn');

DownloadBtn.addEventListener('click', () => {
    if (DownloadAccess == true) {
        html2canvas(ElementCapture, {
            allowTaint: true,
        }).then((canvas) => {
            var imageData = canvas.toDataURL("image/png");
            var link = document.createElement('a');
            link.download = 'image.png';
            link.href = imageData;
            link.target = '_blank';
            document.body.appendChild(link);
            link.click();

            document.body.removeChild(link);
        });
    } else {
        mess = "Save Changes , then try to download"
        Notifyme(mess, statas = false)
    }
});

