// Function to handle the download
function downloadImage(imageSrc) {
    // Create a temporary link element
    const link = document.createElement('a');
    link.href = imageSrc;
    link.download = imageSrc.split('/').pop(); // Set the download attribute with the file name

    // Trigger the download
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

// Function to handle button click event
function handleDownloadClick(event, imageSrc) {
    event.preventDefault(); // Prevent default button action
    downloadImage(imageSrc);
}

// to show the current time 
