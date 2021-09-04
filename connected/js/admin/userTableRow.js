import { capitalizeAll, newElement } from '../utils/dom-utils.js';

const dataFormat = {
  id: -1,
  cin: -1,
  username: '',
  name: '',
  email: '',
  role: '',
  userType: '',
  hasVoted: true,
  accountActivated: true,
};

export const dataMap = {
  en: {
    id: 'ID',
    cin: 'CIN',
    username: 'Username',
    name: 'Name',
    email: 'Email',
    role: { admin: 'Admin', user: 'User' },
    userType: { candidate: 'Candidate', voter: 'Voter' },
    hasVoted: { true: 'Has Voted', false: 'Has Not Voted yet' },
    accountActivated: {
      true: 'Account Activated',
      false: 'Account Not Activated',
    },
  },
  fr: {
    id: 'ID',
    cin: 'CIN',
    username: "Nom d'utilisateur",
    name: 'Nom',
    email: 'Email',
    role: { admin: 'Administrateur', user: 'Utilisateur' },
    userType: { candidate: 'Candidat', voter: 'Votant' },
    hasVoted: { true: 'A voté', false: "N'a pas voté" },
    accountActivated: { true: 'Compte activé', false: 'Compte non activé' },
  },
};

export class UserTableRow {
  constructor(userData = dataFormat) {
    this.userData = userData;
    this.lang = localStorage.getItem('lang') || 'en';
    this.create();
  }

  create() {
    this.createRow();
    return this.row;
  }

  getRow() {
    return this.row;
  }

  getDataId() {
    return this.userData.id;
  }

  getDataCin() {
    return this.userData.cin;
  }

  getDataUsername() {
    return this.userData.username;
  }

  getDataEmail() {
    return this.userData.email;
  }

  createRow() {
    this.checkboxCol = this.createCheckboxCol();
    this.usernameCol = this.createColumn(
      newElement('p', { class: 'result__username' }, [this.userData.username]),
    );

    this.nameCol = this.createNameCol();

    this.emailCol = this.createColumn(
      newElement('p', { class: 'result__email' }, [this.userData.email]),
    );

    this.roleCol = this.createColumn(
      newElement('p', { class: 'result__role' }, [
        capitalizeAll(this.userData.role),
      ]),
    );

    this.activationCol = this.createColumn(
      newElement('p', { class: 'result__activation' }, [
        dataMap[this.lang].accountActivated[this.userData.accountActivated],
      ]),
    );

    this.accountTypeCol = this.createColumn(
      newElement('p', { class: 'result__account-type' }, [
        dataMap[this.lang].userType[this.userData.userType],
      ]),
    );

    this.voteStatusCol = this.createColumn(
      newElement('p', { class: 'result__vote-status' }, [
        dataMap[this.lang].hasVoted[this.userData.hasVoted],
      ]),
    );

    this.cinCol = this.createColumn(
      newElement('p', { class: 'result__cin' }, [this.userData.cin]),
    );

    this.row = newElement('tr', { class: 'users-table__row result__row' }, [
      this.checkboxCol,
      this.usernameCol,
      this.nameCol,
      this.emailCol,
      this.roleCol,
      this.activationCol,
      this.accountTypeCol,
      this.voteStatusCol,
      this.cinCol,
    ]);
  }

  createCheckboxCol() {
    const input = newElement('input', {
      type: 'checkbox',
      id: `result__checkbox-${this.userData.id}`,
      class: 'user-input__checkbox result__checkbox select-user',
    });

    const label = newElement('label', {
      for: `result__checkbox-${this.userData.id}`,
    });

    const bg = newElement('div', { class: 'user-input__bg' });

    const div = newElement('div', { class: 'user-input' }, [bg, label, input]);

    return this.createColumn(div);
  }

  createNameCol(ROOT = '') {
    const fullname = newElement('p', { class: 'user-fullname' }, [
      this.userData.name,
    ]);

    const img = newElement('img', {
      src: `${ROOT}/images/users/user.svg`,
      alt: `${this.userData.name}'s profile`,
      width: '50',
      class: 'result__name__img',
    });

    const profile = newElement('div', { class: 'result__name__profile' }, [
      img,
    ]);

    const div = newElement('div', { class: 'result__name' }, [
      profile,
      fullname,
    ]);

    return this.createColumn(div);
  }

  createColumn(data = null) {
    return newElement('td', { class: 'users-table__col result__col' }, [data]);
  }
}

/*
<tr class='users-table__row search-results result'>
    <td class='users-table__col result__col'>
      <div class='user-input'>
        <div class='user-input__bg'></div>
        <label for='result__checkbox' class='user-input__overlay'></label>
        <input
          type='checkbox'
          id='result__checkbox'
          class='user-input__checkbox result__checkbox select-user'
        />
      </div>
    </td>
    <td class='users-table__col result__col'>
      <p class='username'>faouzi</p>
    </td>
    <td class='users-table__col result__col'>
      <div class='result__name'>
        <div class='result__name__profile'>
          <img
            class='result__name__img'
            src='/images/users/user.svg'
            alt="Faouzi Mohamed's profile"
            width='50'
          />
        </div>
        <p class='user-fullname'>Faouzi Mohamed</p>
      </div>
    </td>
    <td class='users-table__col result__col'>
      <p class='result__email'>faouzimohamed@email.me</p>
    </td>
    <td class='users-table__col result__col'>
      <p class='result__role'>admin</p>
    </td>
    <td class='users-table__col result__col'>
      <p class='result__activation'>Activate</p>
    </td>
    <td class='users-table__col result__col'>
      <p class='result__accountType'>Candidate</p>
    </td>
    <td class='users-table__col result__col'>
      <p class='result__status'>Has vote</p>
    </td>

    <td class='users-table__col result__col'>
      <p class='result__cin'>15660</p>
    </td>
  </tr>
 */
