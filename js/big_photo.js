import { fetchData } from "./import_data.js";

const section_photo = document.querySelector('.big-picture');
const big_picture = document.querySelector('.big-picture__img img');
const likes_count = document.querySelector('.likes-count');
const comments_count = document.querySelector('.comments-count');
const body = document.body;
const close_big = document.querySelector('.big-picture__cancel');
const current_comment = document.querySelector('.current_comment');
const social_comments = document.querySelector('.social__comments');
const social_comment = document.querySelector('.social__comment');

let comments_to_load = 0;
let i = 0;
let current = parseInt(current_comment.textContent);

function upload_comments(photo, data){
  const id = photo.id;

  const all_comment = parseInt(data[id].comments.length);
  if ((all_comment - current) >= 5){
    comments_to_load = 5;
  }else{
    comments_to_load = all_comment - current_comment;
  }
  while (i < comments_to_load){
    console.log(data[id].comments[1].avatar);
    console.log(current);
    const commentElement = social_comment.cloneNode(true);
    commentElement.classList.remove('hidden');
    commentElement.querySelector('img').src = data[id].comments[current].avatar;
    commentElement.querySelector('img').alt = data[id].comments[current].name;
    commentElement.querySelector('.social__text').textContent = data[id].comments[current].message;
    social_comments.appendChild(commentElement);
    i += 1;
    current += 1;
    current_comment.textContent = current;
  }
};

function open_big_photo(photo, data){
  const id = photo.id;
  section_photo.classList.remove('hidden');
  body.classList.add('modal-open');
  section_photo.focus();
  big_picture.src = photo.querySelector('img').src;
  likes_count.textContent = data[id].likes;
  comments_count.textContent = data[id].comments.length;
  upload_comments(photo, data);
}

document.addEventListener('DOMContentLoaded', async () => {
  const data = await fetchData();
  const pictures = document.querySelectorAll('.picture');

  for (let i = 0; i < pictures.length; i++){
    pictures[i].addEventListener('click', ()=>{open_big_photo(pictures[i], data)});
  }
});

function close_big_photo(){
  section_photo.classList.add('hidden');
  body.classList.remove('modal-open');
}

section_photo.addEventListener('keydown', (event) =>{
  if (event.key === 'Escape' || event.key === 'Esc'){
    close_big_photo();
  }
});

close_big.addEventListener('click', close_big_photo);


