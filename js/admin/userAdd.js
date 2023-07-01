import { getEmailRegex, getUsernameRegex, strip } from '../utils/dom-utils.js';
import { AlertDialog } from '../utils/modals/alerte-dialog.js';
import { UserAddModal } from './userAddModal.js';

export const useAddUserModal = () => {
  const openModalBtn = document.querySelector('#openAddModal');
  const modalContainer = document.querySelector('#admin-modal');
  const contentRoot = document.querySelector('.main-content-root');

  if (!openModalBtn || !modalContainer || !contentRoot) return;
  const modal = new UserAddModal();
  const [closeBtn, submitBtn] = [modal.getCancelBtn(), modal.getAddUserBtn()];

  openModalBtn.addEventListener('click', () => {
    contentRoot.classList.add(['prevent-scroll'], ['blur']);
    modalContainer.classList.remove('hidden');
    modalContainer.append(modal.getDialog());
    useFormValidation();
  });

  closeBtn.addEventListener('click', () => {
    modalContainer.classList.add('hidden');
    modalContainer.replaceChildren();
    contentRoot.classList.remove(['prevent-scroll'], ['blur']);
  });
  submitBtn.addEventListener('click', handleAddNewUser);
  submitBtn.disabled = true;
};

function handleAddNewUser(e) {
  e.preventDefault();
  const data = readFormData();
  console.log(data);
  if (checkInputsValidity()) console.log('valid');
  else {
    const msgError = 'Please fill all the required fields!';
    showErrorDialog({ modalText: msgError });
  }
}

function readFormData() {
  const form = document.querySelector('#add-new-user-form');
  if (!form) {
    const msgError =
      'An error occured, please contact a developer to resolve it!';
    return showErrorDialog({ modalText: msgError });
  }
  const formData = new FormData(form);
  const data = {};
  formData.forEach((value, key) => {
    data[key] = value;
  });

  data.isAdmin = form.elements.isAdmin.checked;
  data.isCandidate = form.elements.isCandidate.checked;
  return data;
}

function showErrorDialog({
  modalType = 'error',
  modalTitle = 'Error',
  modalOkBtnText = 'Ok',
  modalText = 'An error occured, please retry!',
}) {
  const options = { modalType, modalTitle, modalOkBtnText, modalText };

  const dialog = new AlertDialog({ ...options });
  const dialogParent = dialog.getDialogWithParent();
  dialog.attachEventsTo('btnOk', 'click', () => {
    dialogParent.remove(dialogParent);
  });
  document.querySelector('.main-content')?.append(dialogParent);
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

  input.addEventListener('input', () => {
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

  input.addEventListener('blur', () => {
    if (!regex.test(input.value) || input.value === '') {
      const message = `${placeholder} is invalid and is required`;
      handleInvalidInput(input, errorElement, message);
    } else {
      handleValidInput(input, errorElement);
    }
  });
}

function checkInputsValidity() {
  const inputs = document.querySelectorAll('.form-control:not(.optional)');
  const isValid = (input) =>
    strip(input.value) !== '' && input.classList.contains('is-valid');
  return [...inputs].every(isValid);
}

function getInputAndErorrElement(id) {
  const input = document.querySelector(`#${id}`);
  const inputFeedbackEL = document.querySelector(`#${id} ~ .invalid-feedback`);
  return [input, inputFeedbackEL];
}

function handleInvalidInput(input, errorElement, message) {
  input.classList.remove('is-valid');
  input.classList.add('is-invalid');
  errorElement.textContent = message;
  input.setCustomValidity(message);
  document.querySelector('#btn-submit').disabled = true;
}

function handleValidInput(input, errorElement) {
  input.classList.remove('is-invalid');
  input.classList.add('is-valid');
  input.setCustomValidity('');
  errorElement.textContent = '✔';
  const areInputsValid = checkInputsValidity();
  if (areInputsValid) {
    document.querySelector('#btn-submit').disabled = false;
  }
}
