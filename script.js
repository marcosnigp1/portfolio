const detail = document.querySelector(".project-detail");
const detailImage = detail.querySelector("img");
const detailText = detail.querySelector("p");
const closeButton = document.querySelector(".project-detail-close");
const projects = document.querySelectorAll("[data-project]");

function closeDetail() {
  detail.classList.remove("is-open");
  detail.setAttribute("aria-hidden", "true");
  document.body.classList.remove("detail-open");
}

projects.forEach((project) => {
  project.addEventListener("click", () => {
    const image = project.querySelector("img");
    const text = project.querySelector("p");

    detailImage.src = image.src;
    detailImage.alt = image.alt;
    detailText.textContent = text.textContent.trim();
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
