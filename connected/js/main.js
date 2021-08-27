import {
  getCandidateData,
  fetchAllCandidateDetails,
  CandidateCard,
} from './candidate-card.js';
import { CandidateModal } from './candidate-modal.js';
import { useDropDown } from './header-drop-down.js';

useDropDown('user-profil-thumb', 'user-menu-card');
useDropDown('lang-flag', 'lang-drop-down');

(async () => {
  const { data } = await fetchAllCandidateDetails();

  const modalContainer = document.querySelector('#candidate-modal-container');
  const cardsWrapper = document.querySelector('.candidate-cards-wrapper');

  data.forEach(async (candidate) => {
    const candidateCard = new CandidateCard(candidate);
    const candidateModal = new CandidateModal(candidateCard);
    const card = candidateCard.getCard();
    const modal = candidateModal.getModal();
    const closeModalButton = candidateModal.getCloseButton();
    const moreDetailsButton = candidateCard.getMoreDetailsButton();

    useModal({
      modalContainerElment: modalContainer,
      openButtonElement: moreDetailsButton,
      closeButtonElement: closeModalButton,
      modal: modal,
    });
    cardsWrapper.append(card);
  });
})();

function useModal({
  modalContainerElment,
  openButtonElement,
  closeButtonElement,
  modal,
}) {
  handleCloseModal(modalContainerElment, closeButtonElement);
  handleOpenModal(modalContainerElment, openButtonElement, modal);
}

function handleOpenModal(modalContainerElment, openButtonElement, modal) {
  const contentRoot = document.querySelector('.main-content-root');
  openButtonElement.addEventListener('click', (e) => {
    contentRoot.classList.add(['prevent-scroll'], ['blur']);
    modalContainerElment.replaceChildren(modal);
    modalContainerElment.classList.remove('hidden');
  });
}

function handleCloseModal(modalContainerElment, closeButton) {
  const contentRoot = document.querySelector('.main-content-root');
  closeButton.addEventListener('click', () => {
    contentRoot.classList.remove(['prevent-scroll'], ['blur']);
    modalContainerElment.classList.add('hidden');
    modalContainerElment.replaceChildren();
  });
}
