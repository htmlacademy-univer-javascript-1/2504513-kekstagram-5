// Редактирование фото

const scaleSmaller = document.querySelector('.scale__control--smaller');
const scaleBigger = document.querySelector('.scale__control--bigger');
const scaleValue = document.querySelector('.scale__control--value');
export const imgPreview = document.querySelector('.img-upload__preview img');

const scaleStep = 25;
const scaleMax = 100;
const scaleMin = 25;
const transformValue = imgPreview.style.transform;
let currentScale = transformValue ? parseFloat(transformValue.match(/scale((.+))/)[1]) : 1;

export function updateScale(scale) {
    currentScale = scale;
    scaleValue.value = `${scale * 100}%`;
    imgPreview.style.transform = `scale(${scale})`;
}

scaleSmaller.addEventListener('click', () => {
    if (currentScale * 100 > scaleMin) {
        currentScale -= scaleStep / 100;
        updateScale(currentScale);
    }
});

scaleBigger.addEventListener('click', () => {
    if (currentScale * 100 < scaleMax) {
        currentScale += scaleStep / 100;
        updateScale(currentScale);
    }
});
