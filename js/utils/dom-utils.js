export function newElement(name, attributes = {}, childs = []) {
  const node = document.createElement(name);
  const keys = Object.getOwnPropertyNames(attributes);
  keys.forEach((key) => {
    node.setAttribute(key, attributes[key]);
  });

  node.append(...childs);
  return node;
}

export const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);
export const capitalizeAll = (str) => str.replace(/\w\S*/g, capitalize);

export function getEmailRegex() {
  return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
}

export function getUsernameRegex() {
  return /^[a-z][a-z0-9_]{3,}$/;
}

export function getNameRegex() {
  return /^[a-zA-Z]{1,}$/;
}

export function strip(str) {
  return str.replace(/\s+/g, '');
}
