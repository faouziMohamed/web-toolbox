import { UserTableRow, dataMap } from './userTableRow.js';

export const lists = async () => {
  const tabBtns = document.querySelectorAll('.tab-btn');
  const data = await getUsersData();
  const tBody = document.querySelector('.users-table-body');
  if (!tabBtns?.length > 0 || (!tBody && !data)) return;

  tabBtns.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      changeActiveButton(e);
      const { filter } = e.target.dataset || 'all';
      useUserFilter(tBody, data, filter);
    });
  });

  useUserFilter(tBody, data, 'all');
};

export const filterUsers = async ({ by = 'all', user, tBody }) => {
  if (!['all', 'admin', 'user', 'candidate'].includes(by)) {
    throw new Error('Invalid filter');
  }

  const row = new UserTableRow(user);
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
