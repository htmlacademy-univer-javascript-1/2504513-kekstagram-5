import { renderPhoto } from "./data_rendering.js";

const default_button = document.getElementById('filter-default');
const random_button = document.getElementById('filter-random');
const discussed_button = document.getElementById('filter-discussed');

function debounce(func, delay) {
  let timeout;
  return function(...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, args), delay);
  };
}
const debounced_render = debounce(renderPhoto, 500);

default_button.addEventListener('click', () => {
  default_button.classList.add('img-filters__button--active');
  random_button.classList.remove('img-filters__button--active');
  discussed_button.classList.remove('img-filters__button--active');
  debounced_render('default');
});
random_button.addEventListener('click', () => {
  default_button.classList.remove('img-filters__button--active');
  random_button.classList.add('img-filters__button--active');
  discussed_button.classList.remove('img-filters__button--active');
  debounced_render('random');
});
discussed_button.addEventListener('click', () => {
  default_button.classList.remove('img-filters__button--active');
  random_button.classList.remove('img-filters__button--active');
  discussed_button.classList.add('img-filters__button--active');
  debounced_render('discussed');
});
