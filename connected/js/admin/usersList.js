import { UserTableRow, dataMap } from './userTableRow.js';

export const lists = async () => {
  const tabBtns = document.querySelectorAll('.tab-btn');
  const data = await getUsersData();
  const tBody = document.querySelector('.users-table-body');
  const checkAllIpunt = document.querySelector('#checkbox-all');
  if (!tabBtns?.length > 0 || (!tBody && !data)) return;
  if (checkAllIpunt) checkAllIpunt.checked = false;

  tabBtns.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      changeActiveButton(e);
      const { filter } = e.target.dataset || 'all';
      useUserFilter(tBody, data, filter);
    });
  });

  checkAllIpunt.addEventListener('change', (e) => {
    const checkboxes = document.querySelectorAll('.user-row-checkbox');
    checkboxes.forEach((checkbox) => {
      checkbox.checked = e.target.checked;
    });
  });
  useUserFilter(tBody, data, 'all');
  const dataStringified = JSON.stringify(data);
  localStorage.setItem('users', dataStringified);
};

export const filterUsers = async ({ by = 'all', user, tBody }) => {
  if (!['all', 'admin', 'user', 'candidate'].includes(by)) {
    throw new Error('Invalid filter');
  }

  const row = new UserTableRow(user);
  row.attachEventTo('checkbox', 'click', useCheckBoxAll);

  const isAdmin = (str) => str === 'admin';
  const isNormalUser = (str) => str === 'user';
  const isCandidate = (str) => str === 'candidate';

  if (by === 'all') {
    tBody.append(row.getRow());
  } else if ([by, user.role].every(isAdmin)) {
    tBody.append(row.getRow());
  } else if ([by, user.role].every(isNormalUser)) {
    tBody.append(row.getRow());
  } else if ([by, user.userType].every(isCandidate)) {
    tBody.append(row.getRow());
  }
};

function useCheckBoxAll() {
  const checkboxes = document.querySelectorAll('.user-row-checkbox');
  const checkAll = document.querySelector('#checkbox-all');
  const checkVisual = document.querySelector('#checkbox-all--visual');

  const inputs = [...checkboxes];
  const isChecked = inputs.every((input) => input.checked);
  const atLeastOneChecked = inputs.some((input) => input.checked);
  if (!checkAll || !checkVisual) return;

  if (isChecked) {
    checkAll.checked = true;
    checkVisual.classList.remove('partially-checked');
  } else if (atLeastOneChecked) {
    checkAll.checked = true;
    checkVisual.classList.add('partially-checked');
  } else {
    checkAll.checked = false;
    checkVisual.classList.remove('partially-checked');
  }
}

export const getUsersData = async (ROOT = '') => {
  const users = await fetch(`${ROOT}/api/users/data.json`);
  const { data } = await users.json();
  return data;
};

function changeActiveButton(e) {
  const activeBtn = document.querySelector('.tab-active');
  if (e.target.classList.contains('tab-active') && !activeBtn) return;
  activeBtn.classList.remove('tab-active');
  e.target.classList.add('tab-active');
}

function useUserFilter(tBody, data, filter) {
  tBody.replaceChildren();
  data.forEach((user) => filterUsers({ user, tBody, by: filter }));
}
