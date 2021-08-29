import { capitalize } from '../utils/dom-utils.js';

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
  const langMap = {
    en: 'english',
    fr: 'french',
  };
  const langDropDown = document.querySelector('.lang-drop-down');
  initialiseLangDropDown(langMap);
  const handler = changeLang(langDropDown, langMap);
  handleLangChanging(handler);
}

function initialiseLangDropDown(langMap) {
  if (!localStorage.getItem('lang')) {
    localStorage.setItem('lang', 'en');
    updateImgSource(langMap.en);
  } else {
    updateImgSource(langMap[localStorage.getItem('lang')]);
  }
}

function handleLangChanging(handler) {
  const elements = document.querySelectorAll('.lang-item');
  if (!elements.length) return;
  elements.forEach((node) => {
    node.addEventListener('click', handler);
  });
}

function changeLang(dropDown, langMap) {
  return (e) => {
    const { lang } = e.target.dataset;
    if (lang) localStorage.setItem('lang', lang);
    dropDown.classList.add('hidden');
    updateImgSource(langMap[lang]);
  };
}

function updateImgSource(lang) {
  const langImg = document.querySelector('.lang-flag');
  // This regex match a url ending with a string.svg (english.svg or french.svg)
  const findLangRegex = /(^.*\/)\w+(.svg)$/g;
  const imgSrc = langImg.src.replace(findLangRegex, `$1${lang}$2`);
  langImg.src = imgSrc;
  langImg.alt = capitalize(lang);
}

export function useDropDown(clickClassName, dropDownClassName) {
  handleOpenCloseDropDown(clickClassName, dropDownClassName);
  handleClosingDropDown(clickClassName, dropDownClassName);
  useLangDropDown();
}
