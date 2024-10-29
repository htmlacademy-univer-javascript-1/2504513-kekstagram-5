export function initValidation(form) {
    const pristine = new Pristine(form, {
        classTo: 'img-upload__field-wrapper',
        errorTextParent: 'img-upload__field-wrapper',
        errorTextClass: 'img-upload__error',
    }, true);

    function validateHashtags(value) {
        if (value.trim() === ''){
            return { valid: true };
        }

        const hashtags = value.trim().split(/\s+/);
        const hashtagPattern = /^#[A-Za-zА-Яа-я0-9]{1,19}$/;
        const uniqueHashtags = new Set();

        if (hashtags.length > 5) {
            return { valid: false, message: 'Превышен лимит хэш-тегов (макс. 5 уникальных хэш-тегов)' };
        }

        for (let tag of hashtags) {
            const normalizedTag = tag.toLowerCase();
            if (!hashtagPattern.test(tag)) {
                return { valid: false, message: 'Неверный формат хэш-тега' };
            }
            if (uniqueHashtags.has(normalizedTag)) {
                return { valid: false, message: 'Хэш-теги должны быть уникальными' };
            }
            uniqueHashtags.add(normalizedTag);
        }

        return { valid: true };
    }

    function getHashtagErrorMessage() {
        const result = validateHashtags(document.querySelector('.text__hashtags').value);
        return result.message || 'Некорректный формат хэш-тегов';
    }

    pristine.addValidator(
        document.querySelector('.text__hashtags'),
        (value) => validateHashtags(value).valid,
        getHashtagErrorMessage,
        2,
        false
    );

    function validateComment(value) {
        return value.length <= 140;
    }

    function getCommentErrorMessage() {
        return 'Комментарий не должен превышать 140 символов';
    }

    pristine.addValidator(
        document.querySelector('.text__description'),
        validateComment,
        getCommentErrorMessage
    );

    return pristine;
}
