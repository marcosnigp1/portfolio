//Stop all carousels from moving.
//Done with help from ChatGPT.

const carousels = document.querySelectorAll(".carousel");

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
