import {
  getCandidateData,
  fetchAllCandidateDetails,
  CandidateCard,
} from './candidate-details.js';
import { useDropDown } from './header-drop-down.js';

useDropDown('user-profil-thumb', 'user-menu-card');
useDropDown('lang-flag', 'lang-drop-down');

(async () => {
  const { data } = await fetchAllCandidateDetails();
  const modalContainer = document.querySelector('#candidate-modal-container');
  const cardsWrapper = document.querySelector('.candidate-cards-wrapper');

  const closeModalButton = document.querySelector(
    '.candidate-modal__close-btn',
  );
  data.forEach(async (candidate) => {
    const candidateCard = new CandidateCard(candidate);
    const card = candidateCard.getCard();
    const moreDetailsButton = candidateCard.getMoreDetailsButton();
    useModal({
      modalContainerElment: modalContainer,
      openButtonElement: moreDetailsButton,
      closeButtonElement: closeModalButton,
    });
    cardsWrapper.append(card);
  });
})();

function useModal({
  modalContainerElment,
  openButtonElement,
  closeButtonElement,
}) {
  handleCloseModal(modalContainerElment, closeButtonElement);
  handleOpenModal(modalContainerElment, openButtonElement);
}

function handleOpenModal(modalContainerElment, openButtonElement) {
  const contentRoot = document.querySelector('.main-content-root');
  openButtonElement.addEventListener('click', (e) => {
    contentRoot.classList.add(['prevent-scroll'], ['blur']);
    modalContainerElment.classList.remove('hidden');
  });
}

function handleCloseModal(modalContainerElment, closeButton) {
  const contentRoot = document.querySelector('.main-content-root');
  closeButton.addEventListener('click', () => {
    contentRoot.classList.remove(['prevent-scroll'], ['blur']);
    modalContainerElment.classList.add('hidden');
  });
}
