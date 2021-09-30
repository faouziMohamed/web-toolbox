(async () => {
  const url = '/api/users/accounts.json';
  const { data = [] } = await fetch(url).then((res) => res.json());
  const searchResult = document.querySelector('.search-result');
  const resultList = document.querySelector('.result-list');
  const searchInput = document.querySelector('#search-input');
  const showResultBlock = () => searchResult?.classList.remove('hidden');
  searchInput?.addEventListener('input', handleInputEvent);
  hideResultBlock();

  function hideResultBlock() {
    searchResult?.classList.add('hidden');
    resultList?.replaceChildren();
  }

  function handleInputEvent(e) {
    const { value } = e.target;
    const typed = value?.toLowerCase().trim() || '';
    !typed && hideResultBlock();
    const filteredList = data.filter(
      ({ id }) => typed && id.toLowerCase().includes(typed),
    );
    if (filteredList.length) {
      showResultBlock();
      const list = filteredList.map((item) => parseHTML(getResultItem(item)));
      resultList?.replaceChildren(...list);
    } else hideResultBlock();
  }
})();

function parseHTML(html) {
  const parser = new DOMParser();
  return parser.parseFromString(html, 'text/html').body.firstChild;
}

const getResultItem = (item) =>
  `<li class="result-item" tabindex="0">
    <span class="result-id">${item.id}</span>
    <span class="result-name">${item.name}</span>
  </li>`;

/*   <li class="result-item">
  <span class="result-id">DE0045F78AA0395</span>
  <span class="result-name">Faouzi Mohamed</span>
  </li>
  <li class="result-item">
  <span class="result-id">DE0045F78AA0395</span>
  <span class="result-name">Halim Akmal</span>
  </li>
  <li class="result-item">
  <span class="result-id">DE0045F78AA0395</span>
  <span class="result-name">Jean Pierre Dupont</span>
  </li>
  <li class="result-item">
  <span class="result-id">DE0045F78AA0395</span>
  <span class="result-name">Faouzi Mohamed</span>
  </li>
  <li class="result-item">
  <span class="result-id">DE0045F78AA0395</span>
  <span class="result-name">Marc Nikolae</span>
  </li>
  <li class="result-item">
  <span class="result-id">DE0045F78960395</span>
  <span class="result-name">Michael B. Jordan</span>
  </li> */
