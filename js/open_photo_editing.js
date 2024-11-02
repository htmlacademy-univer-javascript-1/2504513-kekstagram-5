import { resetForm } from "./update_form.js";

// Открытие закрытие окна редактирование фото
const upload = document.getElementById('upload-file');
const upload_cancel = document.getElementById('upload-cancel');
export const overlay = document.querySelector('.img-upload__overlay');
export const body = document.body;
const img_preview = document.querySelector('.img-upload__preview img');
const inputHashtag = document.querySelector('.text__hashtags');
const inputComment = document.querySelector('.text__description');

upload.addEventListener('change', (event) => {
    const file = event.target.files[0];
    window_Editing(file);
});

function window_Editing(file){
    overlay.classList.remove('hidden');
    body.classList.add('modal-open');
    overlay.focus();
    if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
            img_preview.src = e.target.result;
        };
        reader.readAsDataURL(file);
    }
    
    overlay.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' || event.key === 'Esc') {
            let activeElement = document.activeElement;
            if (activeElement === inputHashtag || activeElement === inputComment) {
                event.preventDefault();
            } else {
                resetForm();
            }
        }
    });
    upload_cancel.addEventListener('click', () => {
        resetForm();
    });
}
