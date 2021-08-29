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
