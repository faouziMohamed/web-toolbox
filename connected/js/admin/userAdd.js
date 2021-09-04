import { UserAddModal } from './userAddModal.js';

export const userAdd = () => {
  const openModalBtn = document.querySelector('#openAddModal');
  const modalContainer = document.querySelector('#admin-modal');
  const modal = new UserAddModal();
  const [closeBtn, submitBtn] = [modal.getCancelBtn(), modal.getAddUserBtn()];

  openModalBtn.addEventListener('click', () => {
    modalContainer.classList.remove('hidden');
    modalContainer.append(modal.getDialog());
  });

  closeBtn.addEventListener('click', () => {
    modalContainer.classList.add('hidden');
    modalContainer.replaceChildren();
  });
  console.log(modalContainer);
  openModalBtn.addEventListener('click', () => {});
};
