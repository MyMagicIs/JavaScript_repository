function openModal(imagePath, captionText) {
    // Get the modal elements
    const modal = document.getElementById("myModal");
    const modalImage = document.getElementById("modal-image");
    const modalCaption = document.getElementById("modal-caption");

    // Update the modal content
    modalImage.src = imagePath;
    modalCaption.textContent = captionText;

    // Show the modal
    modal.style.display = "block";
}

function closeModal() {
    const modal = document.getElementById("myModal");
    modal.style.display = "none";
}

let currentIndex = 0;
const images = [
    { full: "./images/Full/1.jpg", thumb: "./images/Thumb/Thumbnail_1.jpg", alt: "Kanto" },
    { full: "./images/Full/2.jpg", thumb: "./images/Thumb/Thumbnail_2.jpg", alt: "Central Hyrule" },
    { full: "./images/Full/3.jpg", thumb: "./images/Thumb/Thumbnail_3.jpg", alt: "Eventide Island" },
    { full: "./images/Full/4.jpg", thumb: "./images/Thumb/Thumbnail_4.jpg", alt: "Gerudo Town" }
];

// Open the lightbox
function openLightbox(index) {
    currentIndex = index;
    updateLightbox();
    document.getElementById("lightbox").style.display = "block";
}

// Close the lightbox
function closeLightbox() {
    document.getElementById("lightbox").style.display = "none";
}

// Navigate through slides
function navigate(direction) {
    currentIndex = (currentIndex + direction + images.length) % images.length;
    updateLightbox();
}

// Update the lightbox content
function updateLightbox() {
    const largeImage = document.getElementById("currentImage");
    largeImage.src = images[currentIndex].full;
    largeImage.alt = images[currentIndex].alt;

    const thumbnails = document.querySelectorAll(".thumbnail");
    thumbnails.forEach((thumb, i) => {
        thumb.classList.toggle("active", i === currentIndex);
    });
}

// Set the active slide
function setSlide(index) {
    currentIndex = index;
    updateLightbox();
}



