import { newElement } from '../dom-utils.js';

export const argsFormat = {
  modalType: 'error' || 'success' || 'warning' || 'info',
  modalTitle: '',
  modalText: '',
  modalOkBtnText: 'OK',
  modalCancelBtnText: 'Cancel',
  hasCancelBtn: false,
  dialogParent: null,
};

export class AlertDialog {
  #btnBaseClass;
  #dialogClass;
  #btnOkClass;
  #btnCancelClass;
  constructor(modalArgs = argsFormat) {
    this.allTypes = ['error', 'success', 'warning', 'info'];
    if (!this.allTypes.includes(modalArgs.modalType)) {
      const msgError = `modalType must be one of '${this.allTypes.join(', ')}'`;
      throw new Error(msgError);
    }

    this.config = modalArgs;
    this.#btnBaseClass = 'alert-dialog-btn';
    this.#dialogClass = `alert-dialog`;
    this.#btnOkClass = `${this.#btnBaseClass} btn-${this.config.modalType}`;
    this.#btnCancelClass = `${this.#btnBaseClass} btn-cancel`;
    this.createDialog();
    if (!this.config.dialogParent) {
      this.config.dialogParent = newElement('div', {
        class: 'alert-dialog-parent',
      });
    } else this.config.dialogParent.classList.add('alert-dialog-parent');
    this.config.dialogParent.append(this.dialog);
    this.elements = [this.dialog, this.btnOk, this.btnCancel];
    this.events = { dialog: [], btnOk: [], btnCancel: [] };
  }

  getDialog() {
    return this.dialog;
  }

  getDialogWithParent() {
    return this.config.dialogParent;
  }

  getButtonOk() {
    return this.btnOk;
  }

  getButtonCancel() {
    return this.btnCancel;
  }

  attachEventsTo(elementName = '', events = [''], callbacks = [() => {}]) {
    const { eventsArr, callbackArr } = this.#checkArgs(
      elementName,
      events,
      callbacks,
    );

    // keep in memory the events and callbacks
    eventsArr.forEach((event, index) => {
      this[elementName].addEventListener(event, callbackArr[index]);
      this.events[elementName].push(event);
    });

    console.log(`Events attached to ${elementName}`);
  }

  removeEventsFrom(elementName = '', events = [''], callbacks = [() => {}]) {
    const { eventsArr, callbackArr } = this.#checkArgs(
      elementName,
      events,
      callbacks,
    );

    if (this.events[elementName].length === 0) {
      console.log(`No events attached to ${elementName}`);
      return;
    }

    // reomve the events and callbacks in memory
    eventsArr.forEach((event, index) => {
      this[elementName].removeEventListener(event, callbackArr[index]);
      this.events[elementName].splice(this.events[elementName].indexOf(event));
    });

    console.log(`Events removed from ${elementName}`);
  }

  createDialog() {
    this.createTitle();
    this.createBody();
    this.createButtonContainer();
    this.dialog = newElement('div', { class: this.#dialogClass }, [
      this.title,
      this.body,
      this.btnContainer,
    ]);
    return this.dialog;
  }

  createTitle() {
    this.title = newElement('h2', { class: `alert-dialog-title` }, [
      this.config.modalTitle,
    ]);
  }

  createBody() {
    this.createBodyText();
    this.body = newElement('div', { class: `alert-dialog-body` }, [this.text]);
  }

  createButtonContainer() {
    this.createButtonOk();
    const btns = [this.btnOk];

    if (this.config.hasCancelBtn) {
      this.createButtonCancel();
      btns.push(this.btnCancel);
    }

    this.btnContainer = newElement(
      'div',
      { class: `alert-dialog-btn-container` },
      btns,
    );
  }

  createBodyText() {
    this.text = newElement('p', { class: `alert-dialog-text` }, [
      this.config.modalText,
    ]);
  }

  createButtonOk() {
    this.btnOk = newElement('button', { class: this.#btnOkClass }, [
      this.config.modalOkBtnText,
    ]);
  }

  createButtonCancel() {
    this.btnCancel = newElement('button', { class: this.#btnCancelClass }, [
      this.config.modalCancelBtnText,
    ]);
  }

  #checkArgs(elementName, events, callbacks) {
    if (!elementName) {
      let msgError =
        `Expecting elementName to be one of ` +
        `'${this.elements.join(', ')}', but got '${elementName}'`;
      throw new Error(msgError);
    }
    if (!events) {
      msgError = `Expecting event to be a string or an array of event, but got '${event}'`;
      throw new Error(msgError);
    }
    if (!callbacks) {
      msgError = `Expecting callback to be a function or an array of function, but got '${callbacks}'`;
      throw new Error(msgError);
    }

    const eventsArr = Array.isArray(events) ? events : [events];
    const callbackArr = Array.isArray(callbacks) ? callbacks : [callbacks];

    if (eventsArr.length !== callbackArr.length) {
      msgError = `Expecting events and callback to have the same length, but got ${eventsArr.length} and ${callbackArr.length}`;
      throw new Error(msgError);
    }
    return { eventsArr, callbackArr };
  }
}

/*
<div class="dialog-parent">
  <div class='alert-dialog'>
    <h2 class='alert-dialog-title'>Confirm</h2>
    <div class='alert-dialog-body'>
      <p class='alert-dialog-text'>
        Please make sure all field correctly filled.
      </p>
    </div>
    <div class='alert-dialog-btns'>
      <button class="alert-dialog-btn btn-secondary alert-dialog-cancel">Cancel</button>
      <button class='alert-dialog-btn btn-error alert-dialog-ok'>OK</button>
    </div>
  </div>
</div>;
 */
