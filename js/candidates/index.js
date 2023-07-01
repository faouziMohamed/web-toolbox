import {
  fetchAllCandidateDetails,
  useModal,
} from './utils/candidates.utils.js';

const removeLoader = () => {
  const hasLoader = document.querySelector('.has-loader');
  hasLoader?.replaceChildren();
  hasLoader?.classList.remove('has-loader');
};

export async function useCandidateModal({
  modalContainerId,
  candidateWrapperClass,
  candiateModalConstructor,
}) {
  const { data } = await fetchAllCandidateDetails();

  const modalContainer = document.querySelector(`#${modalContainerId}`);
  const candidateWrapper = document.querySelector(`.${candidateWrapperClass}`);
  if (!modalContainer || !candidateWrapper) return;
  const lang = localStorage.getItem('lang');

  removeLoader();
  data.forEach((candidate) => {
    const { openModalButton, closeModalButton, modal } =
      candiateModalConstructor(candidate, lang, candidateWrapper);

    useModal({
      modalContainerElment: modalContainer,
      openButtonElement: openModalButton,
      closeButtonElement: closeModalButton,
      modal,
    });
  });
}

export { CandidateCard } from './card.js';
export { CandidateDetails } from './details.js';
export { CandidateModal } from './modal.js';
export {
  fetchAllCandidateDetails,
  getCandidateData,
} from './utils/candidates.utils.js';
