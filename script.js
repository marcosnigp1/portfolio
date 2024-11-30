//Stop all carousels from moving.
//Some parts were done with help from ChatGPT.

const carousels = document.querySelectorAll(".carousel");
//const banners = document.querySelectorAll("#contact_me_media_photo");

/* Logic for carousels */

//Pause animations
function pauseCarouselAnimation() {
  carousels.forEach((carousel) => {
    carousel.style.animationPlayState = "paused";
  });
}

//Resume animations
function resumeCarouselAnimation() {
  carousels.forEach((carousel) => {
    carousel.style.animationPlayState = "running";
  });
}

//Add event listeners to all carousel elements.
carousels.forEach((carousel) => {
  carousel.addEventListener("mouseenter", pauseCarouselAnimation);
  carousel.addEventListener("mouseleave", resumeCarouselAnimation);
});

/* Logic for social media banners */
