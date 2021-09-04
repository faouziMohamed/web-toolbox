import { newElement } from '../utils/dom-utils.js';

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

    this.form = newElement('form', { class: 'form' }, [
      this.fieldsetFormInputs,
      this.formBtnConainer,
    ]);
  }

  createFormFieldset() {
    const firstNameFormFloating = this.createFormFloating({
      type: 'text',
      name: 'firstname',
      placeholder: 'First Name',
      id: 'firstname',
      required: true,
    });

    const lastNameFormFloating = this.createFormFloating({
      type: 'text',
      name: 'lastname',
      placeholder: 'Last Name',
      id: 'lastname',
      required: true,
    });

    const usernameFormFloating = this.createFormFloating({
      type: 'text',
      name: 'username',
      placeholder: 'Username',
      id: 'username',
      required: true,
    });

    const emailFormFloating = this.createFormFloating({
      type: 'email',
      name: 'email',
      placeholder: 'Email',
      id: 'email',
      required: true,
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
      { class: 'btn btn-secondary btn--ok', type: 'submit' },
      'Add user',
    );

    this.cancelBtn = newElement(
      'button',
      { class: 'btn btn--cancel btn-nobg' },
      'Cancel',
    );

    this.formBtnConainer = newElement('div', { class: 'form-btn-container' }, [
      this.addUserBtn,
      this.cancelBtn,
    ]);
  }

  createInputCheckboxContainer() {
    const { checkSwither: adminCheckboxSwitcher, input: adminInput } =
      this.createCheckboxSwitcher({
        label: 'Admin',
      });

    const { checkSwither: candidateCheckboxSwitcher, input: candidateInput } =
      this.createCheckboxSwitcher({
        label: 'Candidate',
      });
    this.adminInput = adminInput;
    this.candidateInput = candidateInput;
    return newElement('div', { class: 'input-checkbox-container' }, [
      adminCheckboxSwitcher,
      candidateCheckboxSwitcher,
    ]);
  }

  createCheckboxSwitcher({ label }) {
    const { container, input } = this.createSwitchContainer();
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

  createSwitchContainer() {
    const input = this.createFormInput({
      type: 'checkbox',
      id: 'check-admin',
      className: 'hidden checkbox-slider',
    });
    const slider = newElement('span', { class: 'slider' });
    const container = newElement('div', { class: 'input-container switch' }, [
      input,
      slider,
    ]);

    return { container, input };
  }

  createFormFloating({
    type = 'text',
    name = '',
    placeholder = '',
    id,
    required = false,
  }) {
    const input = this.createFormInput({
      type,
      name,
      placeholder,
      id,
      required,
    });

    const label = newElement(
      'label',
      { for: id, class: 'form-floating__label' },
      [placeholder],
    );

    let invalidFeedback;

    if (required)
      invalidFeedback = newElement('div', { class: 'invalid-feedback' }, [
        `${placeholder} is required`,
      ]);

    return newElement('div', { class: 'form-floating' }, [
      input,
      label,
      invalidFeedback,
    ]);
  }

  createFormInput({
    type = 'text',
    name = '',
    placeholder = '',
    id,
    required = false,
    className = 'form-floating__input',
  }) {
    return newElement('input', {
      type,
      name,
      placeholder,
      id,
      required: required,
      class: className,
    });
  }
}

/*
<div class="add-user-modal">
  <form class="admin-modal__form">
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
