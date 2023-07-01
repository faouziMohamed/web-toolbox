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
    this.checkbox = null;
    this.nameColumn = null;
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

  getDataRole() {
    return this.userData.role;
  }

  getInputCheckBox() {
    return this.checkbox;
  }

  attachEventTo(elementName = '', event = 'click', callback = () => {}) {
    if (!elementName) throw new Error('No element name provided!');
    this[elementName].addEventListener(event, callback);
  }

  createRow() {
    this.checkboxCol = this.createCheckboxCol();
    this.usernameCol = UserTableRow.createColumn(
      newElement('p', { class: 'result__username' }, [this.userData.username]),
    );

    this.nameCol = this.createNameCol();

    this.emailCol = UserTableRow.createColumn(
      newElement('p', { class: 'result__email' }, [this.userData.email]),
    );

    this.roleCol = UserTableRow.createColumn(
      newElement('p', { class: 'result__role' }, [
        capitalizeAll(this.userData.role),
      ]),
    );

    this.activationCol = UserTableRow.createColumn(
      newElement('p', { class: 'result__activation' }, [
        dataMap[this.lang].accountActivated[this.userData.accountActivated],
      ]),
    );

    this.accountTypeCol = UserTableRow.createColumn(
      newElement('p', { class: 'result__account-type' }, [
        dataMap[this.lang].userType[this.userData.userType],
      ]),
    );

    this.voteStatusCol = UserTableRow.createColumn(
      newElement('p', { class: 'result__vote-status' }, [
        dataMap[this.lang].hasVoted[this.userData.hasVoted],
      ]),
    );

    this.cinCol = UserTableRow.createColumn(
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
    this.checkbox = newElement('input', {
      type: 'checkbox',
      class: 'hidden checkbox__input user-row-checkbox',
      'data-id': this.userData.id,
      'data-cin': this.userData.cin,
    });

    const checker = newElement('span', {
      class: 'checkbox__checker',
      tabindex: '0',
    });

    const container = newElement(
      'div',
      { class: 'checkbox__input-container' },
      [this.checkbox, checker],
    );

    const label = newElement('label', { class: 'checkbox__label' }, [
      container,
    ]);

    const checkboxWrapper = newElement('div', { class: 'checkbox' }, [label]);

    const div = newElement('div', { class: 'user-input' }, [checkboxWrapper]);

    return UserTableRow.createColumn(div);
  }

  createNameCol(ROOT = '') {
    const fullname = newElement(
      'p',
      { class: 'user-fullname', 'data-id': this.userData.id },
      [this.userData.name],
    );

    const img = newElement('img', {
      src: `/web-toolbox/images/users/user.svg`,
      alt: `${this.userData.name}'s profile`,
      'data-id': this.userData.id,
      width: '50',
      class: 'result__name__img',
    });

    const profile = newElement(
      'div',
      { class: 'result__name__profile', 'data-id': this.userData.id },
      [img],
    );

    this.nameColumn = newElement(
      'div',
      { class: 'result__name', 'data-id': this.userData.id },
      [profile, fullname],
    );

    return UserTableRow.createColumn(this.nameColumn);
  }

  static createColumn(data = null) {
    return newElement('td', { class: 'users-table__col result__col' }, [data]);
  }
}

/*

<tr class='users-table__row search-results result'>
    <td class='users-table__col result__col'>
      <div class='user-input'>
        <div class="checkbox">
          <label class="checkbox__label">
            <div class="checkbox__input-container">
              <input
                tabindex="0"
                type="checkbox"
                class="hidden checkbox__input"
              />
              <span tabindex="0" class="checkbox__checker"></span>
            </div>
          </label>
        </div>      
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
