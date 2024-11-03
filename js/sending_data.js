import { resetForm } from './update_form.js';
import { initValidation } from './validation.js';
import { showSuccessMessage, showErrorMessage} from './status_massage.js';

// Отправка данных на сервер
const form = document.getElementById('upload-select-image');
const submitButton = document.getElementById('upload-submit');
const pristine = initValidation(form);

form.addEventListener('submit', (event) => {
    event.preventDefault();
    const valid = pristine.validate();
    if (valid) {
        const formData = new FormData(form);
        submitButton.disabled = true;
        fetch('https://29.javascript.htmlacademy.pro/kekstagram', {
            method: 'POST',
            body: formData,
        })
        .then(response => {
            if (response.ok) {
                console.log('Данные успешно отправлены!');
                resetForm();
                showSuccessMessage();
            } else {
                showErrorMessage();
                throw new Error('Ошибка при отправке данных!');
            }
        })
        .catch(error => {
            console.error('Произошла ошибка:', error);
        })
        .finally(() => {
            submitButton.disabled = false;
        });
    }
});
