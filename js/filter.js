import { renderPhoto } from "./data_rendering.js";

const defaultButton = document.getElementById('filter-default');
const randomButton = document.getElementById('filter-random');
const discussedButton = document.getElementById('filter-discussed');

function debounce(func, delay) {
  let timeout;
  return function(...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, args), delay);
  };
}
const debouncedRender = debounce(renderPhoto, 500);

defaultButton.addEventListener('click', () => {
  defaultButton.classList.add('img-filters__button--active');
  randomButton.classList.remove('img-filters__button--active');
  discussedButton.classList.remove('img-filters__button--active');
  debouncedRender('default');
});
randomButton.addEventListener('click', () => {
  defaultButton.classList.remove('img-filters__button--active');
  randomButton.classList.add('img-filters__button--active');
  discussedButton.classList.remove('img-filters__button--active');
  debouncedRender('random');
});
discussedButton.addEventListener('click', () => {
  defaultButton.classList.remove('img-filters__button--active');
  randomButton.classList.remove('img-filters__button--active');
  discussedButton.classList.add('img-filters__button--active');
  debouncedRender('discussed');
});
