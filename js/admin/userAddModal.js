import {
  getEmailRegex,
  getNameRegex,
  getUsernameRegex,
  newElement,
} from '../utils/dom-utils.js';

export class UserAddModal {
  constructor() {
    this.create();
    this.candidateInput = null;
    this.adminInput = null;
  }

  getAddUserBtn() {
    return this.addUserBtn;
  }

  getCancelBtn() {
    return this.cancelBtn;
  }

  getAdminInput() {
    return this.adminInput;
  }

  getCandidateInput() {
    return this.candidateInput;
  }

  getDialog() {
    return this.dialog;
  }

  create() {
    this.createDialog();
    return this.dialog;
  }

  createDialog() {
    this.createAdminModalForm();
    this.dialog = newElement('div', { class: 'add-user-modal' }, [this.form]);
  }

  createAdminModalForm() {
    this.createFormFieldset();
    this.createFormButtonContainer();

    this.form = newElement(
      'form',
      { class: 'add-user-form', id: 'add-new-user-form' },
      [this.fieldsetFormInputs, this.formBtnConainer],
    );
  }

  createFormFieldset() {
    const firstNameFormFloating = UserAddModal.createFormFloating({
      type: 'text',
      name: 'firstname',
      placeholder: 'First Name',
      id: 'firstname',
      pattern: getNameRegex().source,
      required: true,
    });

    const lastNameFormFloating = UserAddModal.createFormFloating({
      type: 'text',
      name: 'lastname',
      placeholder: 'Last Name',
      id: 'lastname',
      required: true,
      pattern: getNameRegex().source,
    });

    const usernameFormFloating = UserAddModal.createFormFloating({
      type: 'text',
      name: 'username',
      placeholder: 'Username',
      id: 'username',
      required: true,
      pattern: getUsernameRegex().source,
      className: 'unique',
    });

    const emailFormFloating = UserAddModal.createFormFloating({
      type: 'email',
      name: 'email',
      placeholder: 'Email Address',
      id: 'email',
      required: true,
      className: 'unique',
      pattern: getEmailRegex().source,
    });

    const inputCheckboxContainer = this.createInputCheckboxContainer();

    this.fieldsetFormInputs = newElement('fieldset', { class: 'form-inputs' }, [
      firstNameFormFloating,
      lastNameFormFloating,
      usernameFormFloating,
      emailFormFloating,
      inputCheckboxContainer,
    ]);
  }

  createFormButtonContainer() {
    this.addUserBtn = newElement(
      'button',
      { class: 'btn btn-secondary btn--ok', type: 'submit', id: 'btn-submit' },
      'Add user',
    );

    this.cancelBtn = newElement(
      'button',
      { class: 'btn btn--cancel btn-nobg', id: 'btn-cancel' },
      'Cancel',
    );

    this.formBtnConainer = newElement('div', { class: 'form-btn-container' }, [
      this.addUserBtn,
      this.cancelBtn,
    ]);
  }

  createInputCheckboxContainer() {
    const { checkSwither: adminCheckboxSwitcher, input: adminInput } =
      UserAddModal.createCheckboxSwitcher({
        label: 'Admin',
        name: 'isAdmin',
        id: 'admin-checkbox',
      });

    const { checkSwither: candidateCheckboxSwitcher, input: candidateInput } =
      UserAddModal.createCheckboxSwitcher({
        label: 'Candidate',
        name: 'isCandidate',
        id: 'candidate-checkbox',
      });
    this.adminInput = adminInput;
    this.candidateInput = candidateInput;
    return newElement('div', { class: 'input-checkbox-container' }, [
      adminCheckboxSwitcher,
      candidateCheckboxSwitcher,
    ]);
  }

  static createCheckboxSwitcher({ label, name, id }) {
    const { container, input } = UserAddModal.createSwitchContainer({
      name,
      id,
    });
    const labelTxt = newElement('span', { class: 'label-switch--txt' }, label);
    const labelSwitch = newElement('label', { class: 'label-switch' }, [
      container,
      labelTxt,
    ]);

    const checkSwither = newElement('div', { class: 'checkbox-switcher' }, [
      labelSwitch,
    ]);

    return { checkSwither, input };
  }

  static createSwitchContainer({ name, id }) {
    const input = UserAddModal.createFormInput({
      type: 'checkbox',
      id,
      className: 'hidden checkbox-slider optional',
      name,
    });
    const slider = newElement('span', { class: 'slider' });
    const container = newElement('div', { class: 'input-container switch' }, [
      input,
      slider,
    ]);

    return { container, input };
  }

  static createFormFloating({
    type = 'text',
    name = '',
    placeholder = '',
    id,
    required = false,
    pattern = null,
    className = '',
  }) {
    const input = UserAddModal.createFormInput({
      type,
      name,
      placeholder,
      id,
      required,
      pattern,
      className,
    });

    const label = newElement(
      'label',
      { for: id, class: 'form-floating__label' },
      [placeholder],
    );

    let invalidFeedback;

    if (required)
      invalidFeedback = newElement(
        'div',
        { class: 'invalid-feedback transparent-color' },
        [`${placeholder} is required`],
      );

    return newElement('div', { class: 'form-floating' }, [
      input,
      label,
      invalidFeedback,
    ]);
  }

  static createFormInput({
    type = 'text',
    name = '',
    placeholder = '',
    id,
    required = false,
    className = 'form-floating__input',
    pattern = null,
  }) {
    const classname = `${className} form-control form-floating__input`;
    const opt = { type, name, placeholder, id, required, class: classname };
    if (pattern) opt.pattern = pattern;

    return newElement('input', { ...opt });
  }
}

/*
<div class="add-user-modal">
  <form class="admin-modal__form" id="add-new-user-form">
    <fieldset class="form-inputs">
      <div class="form-floating">
        <input
          type="text"
          class="form-floating__input"
          id="firstname"
          name="firstname"
          placeholder="Firstname"
          required
        />
        <label for="firstname" class="form-floating__label">
          First Name
        </label>
        <div class="invalid-feedback">Field is required</div>
      </div>
      <div class="form-floating">
        <input
          type="text"
          class="form-floating__input"
          id="lastname"
          placeholder="Last name"
          required
        />
        <label
          for="lastname"
          name="lastname"
          class="form-floating__label"
        >
          Last Name
        </label>
        <div class="invalid-feedback">Field is required</div>
      </div>
      <div class="form-floating">
        <input
          type="text"
          class="form-floating__input"
          id="username"
          name="username"
          placeholder="Username"
          required
        />
        <label for="username" class="form-floating__label">
          Username
        </label>
        <div class="invalid-feedback">Field is required</div>
      </div>
      <div class="form-floating">
        <input
          type="email"
          class="form-floating__input"
          id="email"
          name="email"
          placeholder="Email"
          required
        />
        <label for="email" class="form-floating__label">
          Email</label
        >
        <div class="invalid-feedback">Field is required</div>
      </div>
      <div class="input-checkbox-container">
        <div class="checkbox-switcher">
          <label class="label-switch">
            <div class="input-container switch">
              <input
                tabindex="0"
                type="checkbox"
                id="check-admin"
                class="hidden checkbox-slider"
              />
              <span class="slider"></span>
            </div>
            <span class="label-switch--txt"> Candidate </span>
          </label>
        </div>
        <div class="checkbox-switcher">
          <label class="label-switch">
            <div class="input-container switch">
              <input
                tabindex="0"
                type="checkbox"
                id="check-candidate"
                class="hidden checkbox-slider"
              />
              <span class="slider"></span>
            </div>
            <span class="label-switch--txt"> Admin </span>
          </label>
        </div>
      </div>
    </fieldset>
    <div class="form-btn-container">
      <button class="btn btn-secondary btn--ok">Add user</button>
      <button class="btn btn--cancel btn-nobg">Cancel</button>
    </div>
  </form>
</div>
 */
