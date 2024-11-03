import { data, fetchData } from "./import_data.js";
import { renderPhoto } from "./data_rendering.js";

const sectionPhoto = document.querySelector('.big-picture');
const bigPicture = document.querySelector('.big-picture__img img');
const likesCount = document.querySelector('.likes-count');
const commentsCount = document.querySelector('.comments-count');
const body = document.body;
const closeBig = document.querySelector('.big-picture__cancel');
const currentComment = document.querySelector('.current_comment');
const socialComments = document.querySelector('.social__comments');
const socialComment = document.querySelector('.social__comment');
const commentsLoader = document.querySelector('.comments-loader');

let commentsToLoad = 0;
let i = 0;
let current = parseInt(currentComment.textContent);
let bigNow = null;

(async () => {
  await fetchData();
  document.addEventListener('picturesUpdated', () => {
    const pictures = document.querySelectorAll('.picture');
    pictures.forEach((picture) => {
      picture.addEventListener('click', () => {
        openBigPhoto(picture);
      });
    });
  });
  commentsLoader.addEventListener('click', uploadComments);
  renderPhoto('default');
})();

function uploadComments(){
  const allComment = parseInt(data[bigNow].comments.length);
  if ((allComment - current) >= 5){
    commentsToLoad = 5;
  }else{
    commentsToLoad = allComment - parseInt(currentComment.textContent);
  }
  let j = 0;
  while (j < commentsToLoad){
    const commentElement = socialComment.cloneNode(true);
    commentElement.classList.remove('hidden');
    commentElement.querySelector('img').src = data[bigNow].comments[current].avatar;
    commentElement.querySelector('img').alt = data[bigNow].comments[current].name;
    commentElement.querySelector('.social__text').textContent = data[bigNow].comments[current].message;
    socialComments.appendChild(commentElement);
    j += 1;
    current += 1;
    currentComment.textContent = current;
  }
  if (current == allComment){
    commentsLoader.classList.add('hidden');
  }
};

function openBigPhoto(photo){
  bigNow = photo.id;
  sectionPhoto.classList.remove('hidden');
  body.classList.add('modal-open');
  sectionPhoto.focus();
  bigPicture.src = photo.querySelector('img').src;
  likesCount.textContent = data[bigNow].likes;
  commentsCount.textContent = data[bigNow].comments.length;
  uploadComments();
}

function closeBigPhoto(){
  sectionPhoto.classList.add('hidden');
  body.classList.remove('modal-open');
  socialComments.innerHTML = '';
  current = 0;
  currentComment.textContent = current;
  commentsLoader.classList.remove('hidden');
}

sectionPhoto.addEventListener('keydown', (event) =>{
  if (event.key === 'Escape' || event.key === 'Esc'){
    closeBigPhoto();
  }
});
closeBig.addEventListener('click', closeBigPhoto);
