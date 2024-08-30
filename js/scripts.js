document.addEventListener("DOMContentLoaded", function () {
  const galleryContainer = document.getElementById("gallery-container");
  const images = ["project1.jpg", "project2.jpg"];

  images.forEach((image) => {
    const imgElement = document.createElement("img");
    imgElement.src = `images/${image}`;
    imgElement.alt = "Zdjęcie projektu";
    galleryContainer.appendChild(imgElement);
  });
});
