//Some parts were done with help from ChatGPT.
//Slideshow logic done with help of the following material: https://www.w3schools.com/howto/howto_js_slideshow.asp
//Get the current screen size: https://www.w3schools.com/howto/howto_js_get_current_window.asp

//Get values for carousels.
const carousels_1 = document.querySelectorAll(".carousel_1");
const carousels_2 = document.querySelectorAll(".carousel_2");

//Establish values for the slideshow.
let slideIndex = 1;
showSlides(slideIndex);

/* Logic for carousels */
//The logic for the carousels are split into two to allow better control when
//working for mobiles screen, as this was part of the illusion.

//Pause animations
function pauseCarouselAnimation() {
  carousels_1.forEach((carousel) => {
    carousel.style.animationPlayState = "paused";
  });

  carousels_2.forEach((carousel) => {
    carousel.style.animationPlayState = "paused";
  });
}

//Resume animations
function resumeCarouselAnimation() {
  carousels_1.forEach((carousel) => {
    carousel.style.animationPlayState = "running";
  });

  carousels_2.forEach((carousel) => {
    carousel.style.animationPlayState = "running";
  });
}

//Add event listeners to all carousel elements.
carousels_1.forEach((carousel) => {
  carousel.addEventListener("mouseenter", pauseCarouselAnimation);
  carousel.addEventListener("mouseleave", resumeCarouselAnimation);
});

carousels_2.forEach((carousel) => {
  carousel.addEventListener("mouseenter", pauseCarouselAnimation);
  carousel.addEventListener("mouseleave", resumeCarouselAnimation);
});

/* Slideshow */
//Slideshow made with help of w3schools: https://www.w3schools.com/howto/howto_js_slideshow.asp

// Next/previous controls
function plusSlides(n) {
  showSlides((slideIndex += n));
}

// Thumbnail image controls
function currentSlide(n) {
  showSlides((slideIndex = n));
}

function showSlides(n) {
  //Check responsiveness.
  let screenWidth = window.innerWidth;
  let screenHeight = window.innerHeight;

  console.log(screenWidth);
  if (screenWidth < 810) {
    let i;
    let slides = document.querySelectorAll(".carousel_1 .carousel_item");
    let dots = document.getElementsByClassName("dot");
    if (n > slides.length) {
      slideIndex = 1;
    }
    if (n < 1) {
      slideIndex = slides.length;
    }
    for (i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";
    }
    for (i = 0; i < dots.length; i++) {
      dots[i].className = dots[i].className.replace(" active", "");
    }
    slides[slideIndex - 1].style.display = "block";
    dots[slideIndex - 1].className += " active";
  } else {
    let slides = document.querySelectorAll(".carousel_1 .carousel_item");

    //Set as flex all the carousel items that were set to none.
    for (let i = 0; i < slides.length; i++) {
      slides[i].style.display = "flex";
    }
  }
}

//Call check window screen function continously (1 second intervals).
setInterval(showSlides, 1);
