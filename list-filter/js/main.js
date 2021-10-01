import { hideElement, makeBold, modalTemplate, showElement } from './modals.js';
import {
  getResultItem,
  handleEnterKeyPres,
  parseHTML,
  postData,
  redirectTo,
  reloadPage,
} from './utils.js';

/* eslint-disable no-console */
class TransferForm {
  constructor() {
    try {
      this.searchResult = document.querySelector('.search-result');
      this.resultList = document.querySelector('#result-list');
      this.form = document.querySelector('#transfer-form');
      const sections = this.form.querySelectorAll('.transfer-block');
      this.sections = [...sections];
      [this.currentSection] = this.sections;
      this.searchInput = this.form.searchId;
      this.amountInput = this.form.amount;
      this.btnGroup = this.form.querySelectorAll('[id^=form-btn-]');
      this.cancelBtn = this.form.querySelector('#form-btn-cancel');
      this.submitBtn = this.form.querySelector('#form-btn-submit');
      this.modalContainer = this.form.querySelector('#modal-container');
      this.data = [];
      this.handleInputID = this.handleInputID.bind(this);
      this.handleAmountInput = this.handleAmountInput.bind(this);
      this.passToNextSection = this.passToNextSection.bind(this);
      this.initializeForm();
      this.addEventListeners();
      this.hideResultBlock();
      this.searchInput.focus();
    } catch (error) {
      console.error('Transfer form : ', error.message);
    }
  }

  initializeForm() {
    this.sections.forEach((s, index) => {
      s.dataset.index = index;
      const input = s.querySelector('input');
      if (input && index) s.querySelector('input').tabIndex = -1;
      if (index) s.classList.add('disabled');
    });
  }

  addEventListeners() {
    this.form.querySelectorAll('button')?.forEach((btn) => {
      btn.addEventListener('click', (e) => e.preventDefault());
      if (btn.classList.contains('modal-btn')) return;
      btn.disabled = true;
    });

    this.form.querySelectorAll('.form-next-btn')?.forEach((btn, index) => {
      btn.addEventListener('click', () => this.passToNextSection(btn, index));
    });

    this.cancelBtn.addEventListener('click', () => {
      console.log('canceled');
      redirectTo('/');
    });

    this.submitBtn.addEventListener('click', async () => {
      const { value: id } = this.searchInput;
      const { value: amount } = this.amountInput;
      const content = parseHTML(`<p>
        You're about to send ${makeBold(`${amount}DH`)}  to ${makeBold(
        id,
      )}</p>`);
      const btnCancelAction = () => {
        hideElement(this.modalContainer);
        this.modalContainer.replaceChildren();
        reloadPage();
      };

      const { modal } = modalTemplate({
        title: 'Confirm Transfer',
        content,
        btnOkText: 'Send Money',
        btnOkAction: async () => this.makeTransfer(),
        btnCancelAction,
      });
      this.modalContainer.replaceChildren(modal);
      showElement(this.modalContainer);
    });
    this.getData()
      .then(() =>
        ['focus', 'input'].forEach((event) => {
          this.searchInput.addEventListener(event, this.handleInputID);
          this.amountInput.addEventListener(event, this.handleAmountInput);
        }),
      )
      .catch(console.error);

    const button = this.searchInput.parentNode.lastElementChild;
    button.addEventListener('click', () => {
      [('focus', 'input')].forEach((event) =>
        this.searchInput.removeEventListener(event, this.handleInputID),
      );
    });

    this.sections.forEach((s) => {
      const btn = s.querySelector('.form-next-btn');
      btn && s.addEventListener('keydown', handleEnterKeyPres(btn));
    });
  }

  async makeTransfer() {
    const { value: id } = this.searchInput;
    const { value: amount } = this.amountInput;
    const url = '/api/users/accounts/transfer.json';
    const data = { id, amount };

    const { status /* json: resJson */ } = await postData({ url, data });
    if ([200, 201].includes(status)) {
      const { modal } = modalTemplate({
        title: 'Transfer Success',
        content: 'Your transfer has been successfully completed',
        btnOkText: 'Back to Home',
        btnOkAction: () => redirectTo('/'),
        disableBtn: 'cancel',
      });
      this.modalContainer.replaceChildren(modal);
    } else {
      const { modal } = modalTemplate({
        title: 'Transfer Failed',
        content: 'Your transfer has failed',
        btnOkText: 'Retry the transaction',
        btnOkAction: () => reloadPage(),
        btnCancelText: 'Back to Home',
        btnCancelAction: () => redirectTo('/'),
      });
      this.modalContainer.replaceChildren(modal);
    }
    this.modalContainer.classList.remove('hidden');
  }

  passToNextSection(btn, index) {
    let rowInput = this.currentSection?.querySelector('input');
    rowInput.tabIndex = -1;
    [btn.disabled, rowInput.disabled] = [true, true];
    [rowInput, rowInput].forEach((el) => el.blur());
    this.currentSection?.classList.add('disabled');
    this.currentSection = this.sections[index + 1];
    this.currentSection?.classList.remove('disabled');
    rowInput = this.currentSection?.querySelector('input');
    if (rowInput) {
      rowInput.focus();
      rowInput.tabIndex = 0;
    } else {
      this.currentSection.querySelectorAll('button')?.forEach((btnEl) => {
        btnEl.disabled = false;
      });
    }
  }

  handleAmountInput(e) {
    const btn = this.currentSection.querySelector('button');
    btn.disabled = true;
    const { target } = e;
    const { value } = target;
    const limit = Number(e.target.max);
    const floatNumberRegex = /^\d+(\.\d{0,})?$/;
    // Remove non digit or non dot character
    target.value = value.replace(/[^\d.]/g, '');
    // Remove negative sign
    target.value = target.value.replace(/^-/, '');
    // Get valid leading floating number with five decimal after dot
    target.value = target.value.replace(/(\d*(\.\d{1,5})).*/, '$1');
    !floatNumberRegex.test(target.value) && (target.value = '');
    if (Number(target.value) > limit) target.value = limit;
    target.value && (btn.disabled = false);
  }

  async getData() {
    const url = '/api/users/accounts.json';
    const { data = [] } = await fetch(url).then((res) => res.json());
    this.data = data.map(({ id, name }) => ({ id: id.toUpperCase(), name }));
    return this.data;
  }

  showResultBlock() {
    this.searchResult?.classList.remove('hidden');
  }

  hideResultBlock() {
    this.searchResult?.classList.add('hidden');
    this.resultList?.replaceChildren();
  }

  handleInputID() {
    const { value } = this.searchInput;
    const typed = value?.toLowerCase().trim() || '';
    const btn = this.currentSection.querySelector('button');
    const isTypedIncluded = ({ id }) => id?.toLowerCase().includes(typed);
    this.hideResultBlock();
    btn.disabled = true;

    if (!typed) return;
    this.searchInput.value = value.toUpperCase();
    const candidate = this.data.filter(isTypedIncluded);
    if (!candidate.length) return;

    if (candidate.length === 1 && candidate[0]?.id === typed.toUpperCase()) {
      btn.disabled = false;
      return;
    }

    this.showResultBlock();
    const lis = candidate.map((item) => parseHTML(getResultItem(item)));
    lis.forEach((item) => {
      item.addEventListener('click', () => {
        this.searchInput.value = item.dataset.id;
        this.searchInput.focus();
        this.hideResultBlock();
      });
    });

    this.resultList?.replaceChildren(...lis);
  }
}

(() => new TransferForm())();
