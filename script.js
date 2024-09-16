const videoElement = document.getElementById('videoElement');

// Request permission to access the user's camera
navigator.mediaDevices.getUserMedia({ video: true })
    .then(stream => {
        // Attach the stream to the video element
        videoElement.srcObject = stream;
    })
    .catch(error => {
        if (error.name === 'NotAllowedError') {
            alert('You need to allow camera access for video capture.');
        } else if (error.name === 'NotFoundError') {
            alert('No camera was found.');
        } else {
            console.error('Error accessing camera: ', error);
        }
    });
