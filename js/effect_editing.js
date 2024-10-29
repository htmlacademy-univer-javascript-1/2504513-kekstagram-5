// HTML-элементы
const imagePreview = document.querySelector('.img-upload__preview img');
const effectLevelValue = document.querySelector('.effect-level__value');
const effectLevelSlider = document.querySelector('.effect-level__slider');
const effectsContainer = document.querySelector('.effects');
const effectLevelFieldset = document.querySelector('.img-upload__effect-level');

// Настройки эффектов
const effects = {
  none: { filter: '', range: [0, 0], step: 1 },
  chrome: { filter: 'grayscale', range: [0, 1], step: 0.1, unit: '' },
  sepia: { filter: 'sepia', range: [0, 1], step: 0.1, unit: '' },
  marvin: { filter: 'invert', range: [0, 100], step: 1, unit: '%' },
  phobos: { filter: 'blur', range: [0, 3], step: 0.1, unit: 'px' },
  heat: { filter: 'brightness', range: [1, 3], step: 0.1, unit: '' },
};

// Инициализация слайдера
noUiSlider.create(effectLevelSlider, {
  range: { min: 0, max: 1 },
  start: 1,
  step: 0.1,
  connect: 'lower',
});

// Функция обновления фильтра на изображении
export function updateEffect(value, effect) {
  effectLevelValue.value = value;
  imagePreview.style.filter = effects[effect].filter
    ? `${effects[effect].filter}(${value}${effects[effect].unit})`
    : '';
}

// Обработчик выбора эффекта
effectsContainer.addEventListener('change', (evt) => {
  const effect = evt.target.value;
  if (effect === 'none') {
    effectLevelFieldset.classList.add('hidden');
    updateEffect('', 'none');
  } else {
    effectLevelFieldset.classList.remove('hidden');
    effectLevelSlider.noUiSlider.updateOptions({
      range: { min: effects[effect].range[0], max: effects[effect].range[1] },
      start: effects[effect].range[1],
      step: effects[effect].step,
    });
    updateEffect(effects[effect].range[1], effect);
  }
});

// Обновление фильтра при изменении слайдера
effectLevelSlider.noUiSlider.on('update', (values) => {
  const effect = document.querySelector('input[name="effect"]:checked').value;
  updateEffect(values[0], effect);
});
