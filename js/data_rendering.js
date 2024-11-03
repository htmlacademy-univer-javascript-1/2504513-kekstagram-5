import { data, fetchData } from './import_data.js';

(async () => {
  await fetchData();
  const filterTitle = document.querySelector('.img-filters');
  filterTitle.classList.remove('img-filters--inactive');
})();

const picturesContainer = document.querySelector('.pictures');
const pictureTemplate = document.getElementById('picture').content;

function randomNumber(min, max, wasNumber) {
  min = Math.ceil(min);
  max = Math.floor(max);
  let b = Math.floor(Math.random() * (max - min + 1)) + min;
  if (!wasNumber.includes(b)){
    return b;
  } else{
    return randomNumber(min, max, wasNumber);
  }
}

function createElement(photo){
  const pictureElement = pictureTemplate.cloneNode(true);
  pictureElement.querySelector('.picture').id = photo.id;
  pictureElement.querySelector('.picture__img').src = photo.url;
  pictureElement.querySelector('.picture__img').id = photo.id;
  pictureElement.querySelector('.picture__comments').textContent = photo.comments.length;
  pictureElement.querySelector('.picture__likes').textContent = photo.likes;
  picturesContainer.appendChild(pictureElement);
}

export function renderPhoto(filter) {
  const allPicture = picturesContainer.querySelectorAll('.picture');
  allPicture.forEach((element) =>{
    element.remove();
  });
  if (filter === 'default') {
    data.forEach((photo) => {
      createElement(photo);
    });
  } else if (filter === 'random'){
    const pictures = [];
    const wasNumber = [];
    for (let i = 0; i < 10; i++){
      let a = randomNumber(0,data.length-1, wasNumber);
      wasNumber.push(a);
      pictures.push(data[a]);
    }
    pictures.forEach((photo) => {
      createElement(photo);
    });
  } else{
    const sortedData = [...data].sort((a,b) => b.comments.length - a.comments.length);
    sortedData.forEach((photo) => {
      createElement(photo);
    });
  }
  const event = new CustomEvent('picturesUpdated');
  document.dispatchEvent(event);
}
