import { UserTableRow } from './userTableRow.js';

export const lists = async () => {
  const tabBtns = document.querySelectorAll('.tab-btn');
  if (!tabBtns?.length > 0) return;
  tabBtns.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      if (e.target.classList.contains('tab-active')) return;
      const activeBtn = document.querySelector('.tab-active');
      if (!activeBtn) return;
      activeBtn.classList.remove('tab-active');
      e.target.classList.add('tab-active');
      console.log(e.target);
    });
  });
  const data = await getUsersData();
  const tBody = document.querySelector('.users-table-body');
  if (!tBody && !data) return;
  data.forEach((user) => {
    const row = new UserTableRow(user);
    tBody.append(row.getRow());
  });
};

export const getUsersData = async (ROOT = '') => {
  const users = await fetch(`${ROOT}/api/users/data.json`);
  const { data } = await users.json();
  return data;
};
