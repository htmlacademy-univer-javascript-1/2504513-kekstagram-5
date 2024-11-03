import { overlay, body } from './open_photo_editing.js';
import { updateEffect } from './effect_editing.js'
import { updateScale } from './photo_editing.js';

const uploadInput = document.querySelector('#upload-file');
const hashInput = document.querySelector('.text__hashtags');
const commentInput = document.querySelector('.text__description');


export function resetForm() {
    overlay.classList.add('hidden');
    body.classList.remove('modal-open');
    document.querySelector('#effect-none').checked = true;
    hashInput.value = '';
    commentInput.value = '';
    uploadInput.value = '';
    updateEffect('', 'none');
    updateScale(1);
}