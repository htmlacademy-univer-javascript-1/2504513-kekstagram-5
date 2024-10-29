import { showServerErrorMessage } from "./status_massage.js";

document.addEventListener("DOMContentLoaded", () => {
  const url = "https://29.javascript.htmlacademy.pro/kekstagram/data";
  const picturesContainer = document.querySelector(".pictures");
  const pictureTemplate = document.getElementById("picture").content;

  fetch(url)
    .then((response) => {
      if (!response.ok) throw new Error("Ошибка запроса");
      return response.json();
    })
    .then((data) => {
      data.forEach((photo) => {
        const pictureElement = pictureTemplate.cloneNode(true);
        pictureElement.querySelector(".picture__img").src = photo.url;
        pictureElement.querySelector(".picture__comments").textContent = photo.comments.length;
        pictureElement.querySelector(".picture__likes").textContent = photo.likes;
        picturesContainer.appendChild(pictureElement);
      });
    })
    .catch(() => {
      showServerErrorMessage();
      setInterval(() => {
        window.location.reload();
      }, 5000)
    });
});
