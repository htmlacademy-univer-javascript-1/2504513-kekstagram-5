//Сообщение об успешной отправке
const successTemplate = document.querySelector('#success');
const body = document.body;

export function showSuccessMessage() {
  const successMessage = successTemplate.content.cloneNode(true);
  const successElement = successMessage.querySelector('.success');
  const successValue = successMessage.querySelector('.success__inner');
  body.appendChild(successElement);

  successElement.querySelector('.success__button').addEventListener('click', () => {
    successElement.remove();
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' || event.key === 'Esc') {
      successElement.remove();
    }
  }, { once: true });

  document.addEventListener('click', (event) => {
    if (!successValue.contains(event.target)) {
      successElement.remove();
    }
  }, { once: true });
}

// Сообщение об ошибке

const errorTemplate = document.querySelector('#error');

export function showErrorMessage(){
  const errorMessage = errorTemplate.content.cloneNode(true);
  const errorElement = errorMessage.querySelector('.error');
  const errorValue = errorMessage.querySelector('.error__inner');
  body.appendChild(errorElement);

  errorElement.querySelector('.error__button').addEventListener('click', () => {
    errorElement.remove();
  });

  document.addEventListener('keydown', (event) =>{
    if (event.key === 'Escape' || event.key === 'Esc') {
      errorElement.remove();
    }
  }, { once: true });

  document.addEventListener('click', (event) => {
    if (!errorValue.contains(event.target)) {
      errorElement.remove();
    }
  }, { once: true });
}

// Эскейп убирает всё, нужно также как-то перехватить это

//Сообщение об ошибке сервера :(

const serverErrorTemplate = document.getElementById('server_error')

export function showServerErrorMessage(){
  const serverErrorMessage = serverErrorTemplate.content.cloneNode(true);
  const serverErrorElement = serverErrorMessage.querySelector('.server_error');
  const serverErrorValue = serverErrorMessage.querySelector('.server_error__inner');
  body.appendChild(serverErrorElement);

  serverErrorElement.querySelector('.server_error__button').addEventListener('click', () => {
    serverErrorElement.remove();
    window.location.reload();
  });
}