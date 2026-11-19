const detail = document.querySelector(".project-detail");
const detailImage = detail.querySelector("img");
const detailTitle = detail.querySelector(".project-detail-title");
const detailDescription = detail.querySelector(".project-detail-description");
const detailVideo = detail.querySelector(".project-detail-video");
const closeButton = document.querySelector(".project-detail-close");
const projects = document.querySelectorAll("[data-project]");

function closeDetail() {
  detail.classList.remove("is-open");
  detail.setAttribute("aria-hidden", "true");
  document.body.classList.remove("detail-open");
}

projects.forEach((project, index) => {
  project.addEventListener("click", () => {
    const image = project.querySelector("img");

    const isFirstProject = index === 0;
    detailVideo.hidden = !isFirstProject;
    detailImage.hidden = isFirstProject;
    detailTitle.textContent = project.dataset.title;
    detailDescription.textContent = project.dataset.description;

    if (isFirstProject) {
      detailVideo.src = detailVideo.dataset.src || detailVideo.src;
    } else {
      detailImage.src = image.src;
      detailImage.alt = image.alt;
    }
    detail.classList.add("is-open");
    detail.setAttribute("aria-hidden", "false");

    if (window.matchMedia("(max-width: 768px)").matches) {
      document.body.classList.add("detail-open");
    }
  });
});

closeButton.addEventListener("click", closeDetail);

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeDetail();
  }
});
