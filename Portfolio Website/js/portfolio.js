

// Slideshow functionality
let currentSlideIndex = 1; // Start with the first slide
displaySlide(currentSlideIndex); // Display the first slide when the page loads

// Navigate slides using next/previous buttons
function changeSlide(step) {
    currentSlideIndex += step; // Move to the next or previous slide
    displaySlide(currentSlideIndex);
}

// Jump to a specific slide using dots
function goToSlide(slideNumber) {
    currentSlideIndex = slideNumber; // Set the current slide index to the dot clicked
    displaySlide(currentSlideIndex);
}

// Main function to display slides
function displaySlide(slideNumber) {
    const slides = document.querySelectorAll(".mySlides"); // Select all slides
    const dots = document.querySelectorAll(".dot"); // Select all dots

    // Wrap around the slide index if it exceeds bounds
    if (slideNumber > slides.length) currentSlideIndex = 1;
    if (slideNumber < 1) currentSlideIndex = slides.length;

    // Hide all slides and remove "active" from all dots
    slides.forEach(slide => (slide.style.display = "none"));
    dots.forEach(dot => dot.classList.remove("active"));

    // Show the current slide and activate the corresponding dot
    slides[currentSlideIndex - 1].style.display = "block";
    dots[currentSlideIndex - 1].classList.add("active");
}


// Automatically change slides every 5 seconds (optional)
let autoSlideInterval = setInterval(() => changeSlide(1), 5000);

// Pause auto-slideshow when interacting with navigation buttons or dots
document.querySelectorAll(".Previous, .Next, .dot").forEach(element => {
    element.addEventListener("click", () => {
        clearInterval(autoSlideInterval); // Stop auto-slide on interaction
    });
});









