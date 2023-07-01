export const fetchAllCandidateDetails = async (ROOT = '') => {
  const response = await fetch(`/web-toolbox/api/candidates/data.json`);
  const data = await response.json();
  return data;
};

export const getCandidateData = async (candidateID) => {
  const { data } = await fetchAllCandidateDetails();
  return data[candidateID];
};

export function useModal({
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
