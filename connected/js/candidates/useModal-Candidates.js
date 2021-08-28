import { CandidateDetails } from './details.js';
import { useCandidateModal } from './index.js';
import { CandidateModal } from './modal.js';
import { CandidateCard } from './card.js';
import { newElement } from '../utils/dom-utils.js';

export async function useCandidates() {
  await useCandidateModal({
    modalContainerId: 'candidate-modal-container',
    candidateWrapperClass: 'list-candidates',
    candiateModalConstructor: addCandidateAndModal,
  });

  await useCandidateModal({
    modalContainerId: 'candidate-modal-container',
    candidateWrapperClass: 'candidate-cards-wrapper',
    candiateModalConstructor: addCardAndModal,
  });
}

function addCandidateAndModal(candidate, lang, candidateList) {
  const cDetails = new CandidateDetails(candidate, lang);
  const cModal = new CandidateModal(cDetails);
  const details = cDetails.getDetails();
  const modal = cModal.getModal();
  const closeModalButton = cModal.getCloseButton();
  const openModalButton = cDetails.getOverlay();
  const li = newElement('li', { class: 'candidate-item' });
  li.append(details);
  candidateList.append(li);
  return { openModalButton, closeModalButton, modal };
}

function addCardAndModal(candidate, lang, cardsWrapper) {
  const candidateCard = new CandidateCard(candidate, lang);
  const candidateModal = new CandidateModal(candidateCard);
  const card = candidateCard.getCard();
  const modal = candidateModal.getModal();
  const closeModalButton = candidateModal.getCloseButton();
  const openModalButton = candidateCard.getMoreDetailsButton();
  cardsWrapper.append(card);
  return { openModalButton, closeModalButton, modal };
}
