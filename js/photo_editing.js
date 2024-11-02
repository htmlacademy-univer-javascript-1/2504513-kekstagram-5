// Редактирование фото

// Маштаб
const scale_smaller = document.querySelector('.scale__control--smaller');
const scale_bigger = document.querySelector('.scale__control--bigger');
const scale_value = document.querySelector('.scale__control--value');
export const img_preview = document.querySelector('.img-upload__preview img');

const scale_step = 25;
const scale_max = 100;
const scale_min = 25;
const transformValue = img_preview.style.transform;
let current_scale = transformValue ? parseFloat(transformValue.match(/scale((.+))/)[1]) : 1;

export function updateScale(scale) {
    current_scale = scale;
    scale_value.value = `${scale * 100}%`;
    img_preview.style.transform = `scale(${scale})`;
}

scale_smaller.addEventListener('click', () => {
    if (current_scale * 100 > scale_min) {
        current_scale -= scale_step / 100;
        updateScale(current_scale);
    }
});

scale_bigger.addEventListener('click', () => {
    if (current_scale * 100 < scale_max) {
        current_scale += scale_step / 100;
        updateScale(current_scale);
    }
});
