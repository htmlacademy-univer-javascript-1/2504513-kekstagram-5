import { fetchData } from './import_data.js';
const filterTitle = document.querySelector('.img-filters');


document.addEventListener('DOMContentLoaded', async () => {
  const data = await fetchData();
  filterTitle.classList.remove('img-filters--inactive')
  renderPhoto('default', data);
});

const picturesContainer = document.querySelector(".pictures");
const pictureTemplate = document.getElementById("picture").content;

function renderPhoto(filter, data){
  if(filter === 'default'){
    data.forEach((photo) => {
      const pictureElement = pictureTemplate.cloneNode(true);
      pictureElement.querySelector('.picture').id = photo.id;
      pictureElement.querySelector(".picture__img").src = photo.url;
      pictureElement.querySelector(".picture__comments").textContent = photo.comments.length;
      pictureElement.querySelector(".picture__likes").textContent = photo.likes;
      picturesContainer.appendChild(pictureElement);
    });
  }
}
