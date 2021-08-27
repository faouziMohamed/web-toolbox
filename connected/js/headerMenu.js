export const useHeaderMenu = () => {
  const input = document.querySelector('.burger-menu__checkbox');
  const burgerMenu = document.querySelector('.burger-menu');
  if (!input || !burgerMenu) return;

  const contentRoot = document.querySelector('.main-content-root');
  const leftSide = document.querySelector('.left-side');
  const toggle = () => {
    leftSide.classList.toggle('left-side__closed');
    contentRoot.classList.toggle(['prevent-scroll'], ['blur']);
    burgerMenu.classList.toggle('left-side__oppened');
  };

  setDefaultStates(leftSide, contentRoot, burgerMenu, input);
  input.addEventListener('change', toggle);
  const closeArea = document.querySelector('.left-side__clickToClose');
  closeArea.addEventListener('click', () => {
    toggle();
    input.checked = false;
  });

  /**
   *  const media = window.matchMedia('(min-width: 780px)');
   *  const listenMedia = (x) => {
   *    input.checked = false;
   *   if (x.matches) {
   *      ul.classList.remove('hidden');
   *    } else {
   *       ul.classList.add('hidden');
   *     }
   *   };
   *   media.addEventListener('change', listenMedia);
   *   listenMedia(media);
   *
   */
};
function setDefaultStates(leftSide, contentRoot, burgerMenu, input) {
  leftSide.classList.add('left-side__closed');
  leftSide.classList.remove('hidden');
  contentRoot.classList.remove(['prevent-scroll'], ['blur']);
  burgerMenu.classList.remove('left-side__oppened');
  input.checked = false;
}
