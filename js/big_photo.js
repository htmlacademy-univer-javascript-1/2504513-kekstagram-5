import { data, fetchData } from "./import_data.js";

const section_photo = document.querySelector('.big-picture');
const big_picture = document.querySelector('.big-picture__img img');
const likes_count = document.querySelector('.likes-count');
const comments_count = document.querySelector('.comments-count');
const body = document.body;
const close_big = document.querySelector('.big-picture__cancel');
const current_comment = document.querySelector('.current_comment');
const social_comments = document.querySelector('.social__comments');
const social_comment = document.querySelector('.social__comment');
const comments_loader = document.querySelector('.comments-loader');

let comments_to_load = 0;
let i = 0;
let current = parseInt(current_comment.textContent);
let big_now = null;

(async () => {
  await fetchData();
  const pictures = document.querySelectorAll('.picture');
  for (let i = 0; i < pictures.length; i++){
    pictures[i].addEventListener('click', ()=>{
      open_big_photo(pictures[i]);
    });
  }
  comments_loader.addEventListener('click', upload_comments);
})();

function upload_comments(){
  const all_comment = parseInt(data[big_now].comments.length);
  if ((all_comment - current) >= 5){
    comments_to_load = 5;
  }else{
    comments_to_load = all_comment - parseInt(current_comment.textContent);
  }
  let j = 0;
  while (j < comments_to_load){
    const commentElement = social_comment.cloneNode(true);
    commentElement.classList.remove('hidden');
    commentElement.querySelector('img').src = data[big_now].comments[current].avatar;
    commentElement.querySelector('img').alt = data[big_now].comments[current].name;
    commentElement.querySelector('.social__text').textContent = data[big_now].comments[current].message;
    social_comments.appendChild(commentElement);
    j += 1;
    current += 1;
    current_comment.textContent = current;
  }
  if (current == all_comment){
    comments_loader.classList.add('hidden');
  }
};

function open_big_photo(photo){
  big_now = photo.id;
  section_photo.classList.remove('hidden');
  body.classList.add('modal-open');
  section_photo.focus();
  big_picture.src = photo.querySelector('img').src;
  likes_count.textContent = data[big_now].likes;
  comments_count.textContent = data[big_now].comments.length;
  upload_comments();
}

function close_big_photo(){
  section_photo.classList.add('hidden');
  body.classList.remove('modal-open');
  social_comments.innerHTML = '';
  current = 0;
  current_comment.textContent = current;
  comments_loader.classList.remove('hidden');
}

section_photo.addEventListener('keydown', (event) =>{
  if (event.key === 'Escape' || event.key === 'Esc'){
    close_big_photo();
  }
});
close_big.addEventListener('click', close_big_photo);
