export function parseHTML(html) {
  const parser = new DOMParser();
  return parser.parseFromString(html, 'text/html').body.firstChild;
}

export function handleEnterKeyPres(el) {
  return (e) => {
    if (e.key !== 'Enter' || el.disabled) return;
    el.click();
  };
}

export function getResultItem(item) {
  return `<li class="result-item" tabindex="0" data-id="${item.id}">
            <span class="result-id">${item.id}</span>
            <span class="result-name">${item.name}</span>
          </li>`;
}

export function redirectTo(url) {
  window.location.href = url;
}

export const reloadPage = () => window.location.reload();

export async function postData({ url = '', data = {}, stringify = true }) {
  return fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: stringify ? JSON.stringify(data) : data,
  });
}

export async function getData({ url = '' }) {
  const response = await fetch(url);
  return response.json();
}

export function newElement(name, attributes = {}, childs = []) {
  const node = document.createElement(name);
  const keys = Object.getOwnPropertyNames(attributes);
  keys.forEach((key) => {
    node.setAttribute(`${key}`, attributes[`${key}`]);
  });
  node.replaceChildren(...childs);
  return node;
}

export function hideElement(el) {
  el.classList.add('hidden');
}

export function showElement(el) {
  el.classList.remove('hidden');
}

export const makeBold = (str) => `<span class="bold-text">${str}</span>`;

export function emptyElement(el) {
  el.replaceChildren();
}

export function emptyAndClose(el) {
  emptyElement(el);
  hideElement(el);
}
