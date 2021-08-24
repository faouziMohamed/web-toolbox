function handleOpenAndCloseMenuModal(clickClassName, modalClassName) {
  const card = document.querySelector(`.${modalClassName}`);
  if (!card) return;
  const profilBtn = document.querySelector(`.${clickClassName}`);
  card.classList.add('hidden');
  profilBtn.addEventListener('click', () => {
    card.classList.toggle('hidden');
  });
}

function handleClosingUserCard(clickClassName, modalClassName) {
  const card = document.querySelector(`.${modalClassName}`);
  if (!card) return;
  const img = document.querySelector(`.${clickClassName}>img`);
  const imgClassName = img.className;
  document.body.addEventListener(
    'click',
    (e) => {
      if (imgClassName === e.target.className) return;
      card.classList.add('hidden');
    },
    true,
  );
}

export function useModalMenu(clickClassName, modalClassName) {
  handleOpenAndCloseMenuModal(clickClassName, modalClassName);
  handleClosingUserCard(clickClassName, modalClassName);
}
