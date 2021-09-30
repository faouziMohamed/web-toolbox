class SearchBar {
  constructor() {
    this.searchResult = document.querySelector('.search-result');
    this.resultList = document.querySelector('#result-list');
    this.searchForm = document.querySelector('#search-form');
    this.searchInput = this.searchForm.searchId;
    this.searchBtn = this.searchForm.searchBtn;
    this.addEventListener();
    this.hideResultBlock();
  }
  async getData() {
    const url = '/api/users/accounts.json';
    const { data = [] } = await fetch(url).then((res) => res.json());
    this.data = data;
    return this.data;
  }
  showResultBlock() {
    this.searchResult?.classList.remove('hidden');
  }
  hideResultBlock() {
    this.searchResult?.classList.add('hidden');
    this.resultList?.replaceChildren();
  }
  handleInputEvent() {
    console.log(this.searchForm);
    const { value } = this.searchInput;
    const typed = value?.toLowerCase().trim() || '';
    if (!typed) return this.hideResultBlock();

    const filteredList = this.data.filter(({ id }) =>
      id.toLowerCase().includes(typed),
    );

    if (filteredList.length) {
      this.showResultBlock();
      const list = filteredList.map((item) => parseHTML(getResultItem(item)));
      this.resultList?.replaceChildren(...list);
    } else this.hideResultBlock();
  }

  addEventListener() {
    this.getData().then((data) => {
      this.searchBtn.addEventListener('click', () => this.handleInputEvent());
      this.searchInput.addEventListener('input', () => this.handleInputEvent());
    });
  }
}

(() => new SearchBar())();

function parseHTML(html) {
  const parser = new DOMParser();
  return parser.parseFromString(html, 'text/html').body.firstChild;
}

const getResultItem = (item) =>
  `<li class="result-item" tabindex="0">
    <span class="result-id">${item.id}</span>
    <span class="result-name">${item.name}</span>
  </li>`;
