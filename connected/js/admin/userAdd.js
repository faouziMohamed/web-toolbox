import { UserAddModal } from './userAddModal.js';

export const userAdd = () => {
  const openModalBtn = document.querySelector('#openAddModal');
  const modalContainer = document.querySelector('#admin-modal');
  const modal = new UserAddModal();
  const [closeBtn, submitBtn] = [modal.getCancelBtn(), modal.getAddUserBtn()];

  openModalBtn.addEventListener('click', () => {
    modalContainer.classList.remove('hidden');
    modalContainer.append(modal.getDialog());
    useFormValidation();
  });

  closeBtn.addEventListener('click', () => {
    modalContainer.classList.add('hidden');
    modalContainer.replaceChildren();
  });
  submitBtn.addEventListener('click', handleAddNewUser);
  submitBtn.disabled = true;
};

function handleAddNewUser(e) {
  const form = document.querySelector('#add-new-user-form');
  console.log(form.elements['isAdmin'].checked);

  const formData = new FormData(form);
  // console.log(form);
  // formData.forEach((value, key) => {
  //   console.log(key, getUsernameRegex);
  // });
  // e.preventDefault();
}

function useFormValidation() {
  const [firstName, firstNameFeedbackEL] = getInputAndErorrElement('firstname');
  const [lastName, lastNameFeedbackEL] = getInputAndErorrElement('lastname');
  const [email, emailFeedbackEL] = getInputAndErorrElement('email');
  const [username, usernameFeedbackEL] = getInputAndErorrElement('username');
  const emailRegex = getEmailRegex();
  const usernameRegex = getUsernameRegex();

  handleInputValueError(firstName, firstNameFeedbackEL);
  handleInputValueError(lastName, lastNameFeedbackEL);
  handleInputWithRegexValueError(username, usernameFeedbackEL, usernameRegex);
  handleInputWithRegexValueError(email, emailFeedbackEL, emailRegex);
}

function handleInputValueError(input, errorElement) {
  const placeholder = input.getAttribute('placeholder');

  input.addEventListener('input', (e) => {
    if (input.value.replace(/\s+/g, '') === '') {
      const message = `${placeholder} is invalid and is required`;
      handleInvalidInput(input, errorElement, message);
    } else {
      handleValidInput(input, errorElement);
    }
  });

  input.addEventListener('blur', () => {
    if (input.value.replace(/\s+/g, '') === '') {
      const message = `${placeholder} is invalid and is required`;
      handleInvalidInput(input, errorElement, message);
    } else {
      handleValidInput(input, errorElement);
    }
  });
}

function handleInputWithRegexValueError(input, errorElement, regex) {
  const placeholder = input.getAttribute('placeholder');
  input.addEventListener('input', () => {
    if (input.value.replace(/\s+/g, '') === '') {
      const message = `${placeholder} is invalid and is required`;
      handleInvalidInput(input, errorElement, message);
    } else if (!regex.test(input.value)) {
      const message = `Invalid ${placeholder}`;
      handleInvalidInput(input, errorElement, message);
    } else {
      handleValidInput(input, errorElement);
    }
  });

  input.addEventListener('blur', (e) => {
    if (!regex.test(input.value) || input.value === '') {
      const message = `${placeholder} is invalid and is required`;
      handleInvalidInput(input, errorElement, message);
    } else {
      handleValidInput(input, errorElement);
    }
  });
}

function checkInputsValidity() {
  const isValid = (input) =>
    strip(input.value) !== '' && !input.classList.contains('is-valid');

  const inputs = document.querySelectorAll('.form-control');
  return [...inputs].every(isValid);
}

function getInputAndErorrElement(id) {
  const input = document.querySelector(`#${id}`);
  const inputFeedbackEL = document.querySelector(`#${id} ~ .invalid-feedback`);
  return [input, inputFeedbackEL];
}

function handleInvalidInput(input, errorElement, message) {
  input.classList.add('is-invalid');
  errorElement.textContent = message;
  input.setCustomValidity(message);
}

function handleValidInput(input, errorElement) {
  input.classList.remove('is-invalid');
  input.setCustomValidity('');
  errorElement.textContent = '✔';
  const areInputsValid = checkInputsValidity();
  if (areInputsValid) {
    document.querySelector('#btn-submit').disabled = false;
  }
}

function getEmailRegex() {
  return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
}

function getUsernameRegex() {
  return /^[a-z][a-z0-9_]{3,}$/;
}

function strip(str) {
  return str.replace(/\s+/g, '');
}
