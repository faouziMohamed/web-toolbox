import { newElement } from '../utils/dom-utils.js';

export class CandidateModal {
  constructor(candidate) {
    this.candidate = candidate;
    try {
      this.createModal();
    } catch (error) {
      console.log('Candidate Modal: ', error);
    }
  }

  getModal() {
    if (!this.modal) {
      this.createModal();
    }
    return this.modal;
  }

  getCloseButton() {
    return this.closeButton;
  }

  createModal() {
    this.createCloseButton();
    this.createCandidateModalProfile();
    this.createFullDetailsBlock();
    this.modal = newElement(
      'div',
      { class: 'candidate-modal', role: 'document' },
      [this.closeButton, this.candidateModalProfile, this.fullDetailsBlock],
    );
  }

  createCloseButton() {
    this.closeButton = newElement(
      'button',
      {
        class: 'candidate-modal__close-btn',
        tabindex: 0,
        id: 'candidate-modal__close-btn',
        'aria-label': 'Close this dialog window',
        'data-a11y-dialog-hide': '',
      },
      [newElement('i', { class: 'fas fa-times' })],
    );
  }

  createCandidateModalProfile() {
    this.createCandidateProfilePciture();
    this.candidateModalProfile = newElement(
      'div',
      { class: 'candidate-modal-profile' },
      [this.profilPicture],
    );
  }

  createCandidateProfilePciture(ROOT = '') {
    this.altPic = `${ROOT}/images/users/user.svg`;

    this.profilPicture = newElement('img', {
      class: 'candidate-modal-profile__picture',
      src: this.altPic,
      alt: `${this.candidate.getDataName()}'s profile picture`,
      width: '200',
      tabindex: 0,
    });

    fetch(`${ROOT}/images/users/${this.candidate.candidateID}`)
      .then(async (res) => {
        if (!res.ok) throw new Error('Missing Images');
        const buf = await res.arrayBuffer();
        const urlPicture = URL.createObjectURL(new Blob([buf]));
        this.picturePath = urlPicture;
        this.profilPicture.src = this.picturePath;
      })
      .catch((err) => {
        console.log(err);
      });
  }

  createFullDetailsBlock() {
    this.createFullDetailsHeadingsBlock();
    this.createBioBlock();
    this.fullDetailsBlock = newElement(
      'section',
      { class: 'candidate-full-details' },
      [this.fullDetailsHeadingsBlock, this.bioBlock],
    );
  }

  createBioBlock() {
    this.bioBlock = newElement(
      'p',
      {
        class: 'candidate-full-details__bio',
        id: 'candidate-full-details__bio',
        tabindex: 0,
      },
      [this.candidate.getDataBio()],
    );
  }

  createFullDetailsHeadingsBlock() {
    this.createNameBlock();
    this.createSkillsBlock();
    this.fullDetailsHeadingsBlock = newElement(
      'header',
      { class: 'candidate-full-details__headings' },
      [this.nameBlock, this.skillsBlock],
    );
  }

  createNameBlock() {
    this.nameBlock = newElement(
      'h2',
      {
        class: 'candidate-full-details__name',
        id: 'candidate-full-details__name',
      },
      [this.candidate.getDataName()],
    );
  }

  createSkillsBlock() {
    const skills = this.candidate.getDataSkills().join(' | ');
    this.skillsBlock = newElement(
      'h3',
      { class: 'candidate-full-details__skills' },
      [skills],
    );
  }
}

/**
<div
  class="candidate-modal-container hidden"
  tabindex="-1"
  aria-labelledby="candidate-full-details__name"
  aria-describedby="candidate-modal-description"
  aria-hidden="true"
  id="candidate-modal-container"
>
  <div class="candidate-modal" role="document">
    <button
      data-a11y-dialog-hide
      class="candidate-modal__close-btn"
      aria-label="Close this dialog window"
      tabindex="0"
      id="candidate-modal__close-btn"
    >
      <i class="fas fa-times"></i>
    </button>
    <div class="candidate-modal-profile">
      <img
        src="/images/users/16145"
        alt="Mohamed Faouzi's Profile picture"
        class="candidate-modal-profile__picture"
        width="200"
        tabindex="0"
      />
    </div>
    <section class="candidate-full-details">
      <header class="candidate-full-details__headings">
        <h2
          class="candidate-full-details__name"
          id="candidate-full-details__name"
        >
          Mohamed Faouzi
        </h2>
        <h3 class="candidate-full-details__skills">
          Web dev | Software engineer | Cloud engineer | Data
          scientist
        </h3>
      </header>
      <p
        class="candidate-full-details__bio"
        tabindex=0"
        id="candidate-full-details__bio"
      >
        BIO.
      </p>
    </section>
  </div>
</div>
*/
