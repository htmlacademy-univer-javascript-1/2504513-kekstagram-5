import { data, fetchData } from './import_data.js';

(async () => {
  await fetchData();
  const filterTitle = document.querySelector('.img-filters');
  filterTitle.classList.remove('img-filters--inactive');
  renderPhoto('default');
})();

const picturesContainer = document.querySelector(".pictures");
const pictureTemplate = document.getElementById("picture").content;

function randomNumber(min, max, was_number) {
  min = Math.ceil(min);
  max = Math.floor(max);
  let b = Math.floor(Math.random() * (max - min + 1)) + min;
  if (!was_number.includes(b)){
    return b;
  } else{
    return randomNumber(min, max, was_number);
  }
}

export function renderPhoto(filter) {
  const all_picture = picturesContainer.querySelectorAll('.picture');
  all_picture.forEach((element) =>{
    element.remove();
  });
  if (filter === 'default') {
    data.forEach((photo) => {
      const pictureElement = pictureTemplate.cloneNode(true);
      pictureElement.querySelector('.picture').id = photo.id;
      pictureElement.querySelector(".picture__img").src = photo.url;
      pictureElement.querySelector(".picture__img").id = photo.id;
      pictureElement.querySelector(".picture__comments").textContent = photo.comments.length;
      pictureElement.querySelector(".picture__likes").textContent = photo.likes;
      picturesContainer.appendChild(pictureElement);
    });
  } else if (filter === 'random'){
    const pictures = [];
    const was_number = [];
    for (let i = 0; i < 10; i++){
      let a = randomNumber(0,data.length-1, was_number);
      was_number.push(a);
      pictures.push(data[a]);
    }
    pictures.forEach((photo) => {
      const pictureElement = pictureTemplate.cloneNode(true);
      pictureElement.querySelector('.picture').id = photo.id;
      pictureElement.querySelector(".picture__img").src = photo.url;
      pictureElement.querySelector(".picture__img").id = photo.id;
      pictureElement.querySelector(".picture__comments").textContent = photo.comments.length;
      pictureElement.querySelector(".picture__likes").textContent = photo.likes;
      picturesContainer.appendChild(pictureElement);
    });
  } else{
    const sorted_data = data.sort((a,b) => b.comments.length - a.comments.length);
    sorted_data.forEach((photo) => {
      const pictureElement = pictureTemplate.cloneNode(true);
      pictureElement.querySelector('.picture').id = photo.id;
      pictureElement.querySelector(".picture__img").src = photo.url;
      pictureElement.querySelector(".picture__img").id = photo.id;
      pictureElement.querySelector(".picture__comments").textContent = photo.comments.length;
      pictureElement.querySelector(".picture__likes").textContent = photo.likes;
      picturesContainer.appendChild(pictureElement);
    });
  }
}
