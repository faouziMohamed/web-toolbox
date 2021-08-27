function handleOpenCloseDropDown(clickClassName, dropDownClassName) {
  const dropDown = document.querySelector(`.${dropDownClassName}`);
  if (!dropDown) return;
  const clickToOpenBtn = document.querySelector(`.${clickClassName}`);
  dropDown.classList.add('hidden');
  clickToOpenBtn.addEventListener('click', (e) => {
    const { className } = e.target;
    if (className !== clickClassName) return;
    dropDown.classList.toggle('hidden');
  });
}

function handleClosingDropDown(clickClassName, dropDownClassName) {
  const dropDown = document.querySelector(`.${dropDownClassName}`);
  if (!dropDown) return;
  const clickToOpenIMGBtn = document.querySelector(`.${clickClassName}`);
  const imgClassName = clickToOpenIMGBtn.className;
  document.body.addEventListener('click', (e) => {
    if (imgClassName === e.target.className) return;
    dropDown.classList.add('hidden');
  });
}

function useLangDropDown() {
  const dropDown = document.querySelector('.lang-drop-down');
  const changeLange = (e) => {
    const { lang } = e.target.dataset;
    if (lang) localStorage.setItem('lang', lang);
    dropDown.classList.add('hidden');
  };
  if (!localStorage.getItem('lang')) localStorage.setItem('lang', 'en');

  const elements = document.querySelectorAll('.lang-item');
  if (!elements.length) return;
  elements.forEach((node) => {
    node.addEventListener('click', changeLange);
  });
}

export function useDropDown(clickClassName, dropDownClassName) {
  handleOpenCloseDropDown(clickClassName, dropDownClassName);
  handleClosingDropDown(clickClassName, dropDownClassName);
  useLangDropDown();
}
