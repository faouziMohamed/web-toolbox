import { parseHTML } from './utils.js';

export const modalTemplate = ({
  title = 'Confirm',
  content = '',
  question = 'Do you confirm your choice?',
  btnOkText = 'Ok',
  btnCancelText = 'Cancel',
  btnOkAction = () => {},
  btnCancelAction = () => {},
  disableBtn = '',
}) => {
  const modalHtml = `
  <div class="modal">
      <h2 class="modal-title">${title || 'Confirm'}</h2>
      <div class="modal-body">
        <div class="modal-text msg"></div>
        <p class="modal-txt qst">${question}</p>
      </div>
      <div class="modal-btns ${disableBtn && 'centerRow'}">
        <button class="modal-btn btn-secondary modal-cancel">${btnCancelText}</button>
        <button class="modal-btn btn-primary modal-ok">${btnOkText}</button>
      </div>
    </div>
    `;

  const modal = parseHTML(modalHtml);
  const msg = modal.querySelector('.modal-text.msg');
  const qst = modal.querySelector('.modal-txt.qst');
  const cancelBtn = modal.querySelector('.modal-btn.modal-cancel');
  const okBtn = modal.querySelector('.modal-btn.modal-ok');
  if (!content) throw new Error('Modal content is required');
  msg.replaceChildren(content);
  [okBtn, cancelBtn].forEach((btn) =>
    btn.addEventListener('click', (e) => e.preventDefault()),
  );

  if (disableBtn?.toLowerCase().startsWith('cancel')) {
    [cancelBtn, qst].forEach(hideElement);
  } else {
    cancelBtn.addEventListener('click', btnCancelAction);
  }

  if (disableBtn?.toLowerCase().startsWith('ok')) {
    [okBtn, qst].forEach(hideElement);
  } else {
    okBtn.addEventListener('click', btnOkAction);
  }

  return { modal, okBtn, cancelBtn };
};

export function hideElement(el) {
  el.classList.add('hidden');
}

export function showElement(el) {
  el.classList.remove('hidden');
}

export const makeBold = (str) => `<span class="bold-text">${str}</span>`;
