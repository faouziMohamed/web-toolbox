import { newElement } from './utils/dom-utils.js';

export const fetchAllCandidateDetails = async () => {
  const API_URL = 'http://localhost:8087';
  const response = await fetch(`${API_URL}/candidate/details/data.json`);
  const data = await response.json();
  return data;
};

export const getCandidateData = async (candidateID) => {
  const { data } = await fetchAllCandidateDetails();
  return data[candidateID];
};

const defaultArg = {
  id: -1,
  name: '',
  email: '',
  description: {
    en: { details: '', skills: [''] },
  },
};
export class CandidateCard {
  constructor(candidateData = defaultArg, lang = 'en') {
    if (JSON.stringify(candidateData) === JSON.stringify(defaultArg)) {
      throw new Error('You need to pass data to the constructor');
    }
    this.candidateID = candidateData.id;
    this.data = candidateData;
    this.lang = lang;
    this.candidateCard = null;
    this.skills = '';
    this.picturePath = '';
    try {
      this.createCandidateCard();
    } catch (error) {
      console.log('In class Error');
      console.error(error);
    }
  }

  getCard() {
    if (!this.candidateCard) {
      this.createCandidateCard();
    }
    return this.candidateCard;
  }
  getPicturePath() {
    return this.picturePath;
  }

  getName() {
    return this.data.name;
  }
  getSkillsData() {
    return this.skills;
  }

  getId() {
    return this.candidateID;
  }

  getBioData() {
    return this.data.description[this.lang].details;
  }

  getMoreDetailsButton() {
    if (!this.moreDetailsButton) {
      this.createCandidateCard();
    }
    return this.moreDetailsButton;
  }

  getVoteButton() {
    if (!this.voteButton) {
      this.createCandidateCard();
    }
    return this.voteButton;
  }

  createCandidateCard() {
    this.createCandidateFigure();
    this.createVoteButton();
    this.candidateCard = newElement(
      'div',
      { class: 'candidate-card', tabindex: 0 },
      [this.candidateFigure, this.voteButton],
    );
  }

  createCandidateFigure() {
    this.createImageWrapper();
    this.createCandidateDescription();
    this.candidateFigure = newElement(
      'figure',
      { class: 'candidate-card__figure' },
      [this.imageWrapper, this.candidateDescription],
    );
  }
  createVoteButton() {
    this.voteButton = newElement(
      'button',
      { class: 'btn vote-btn btn-primary', title: 'Click to vote' },
      ['Vote now'],
    );
  }

  createImageWrapper() {
    this.createProfilPicture();
    this.createMoreDetailsButtonWrapper();
    this.createMoreInfoButton();
    this.imageWrapper = newElement(
      'div',
      { class: 'candidate-figure__top-details' },
      [this.profilPicture, this.moreDetailsWrapper, this.moreInfoBtnWrapper],
    );
  }

  createCandidateDescription() {
    this.createCandidateName();
    this.createCandidateDetails();
    this.candidateDescription = newElement(
      'figcaption',
      { class: 'candidate-description' },
      [this.candidateName, this.candidateDetails],
    );
  }

  createCandidateName() {
    this.candidateName = newElement(
      'span',
      { class: 'candidate-description__name' },
      [this.data.name],
    );
  }

  createCandidateDetails() {
    const { skills: skillsArray } = this.data.description[this.lang];
    this.skills = skillsArray.join(' | ');
    this.candidateDetails = newElement(
      'small',
      { class: 'candidate-description__skills' },
      [this.skills],
    );
  }

  createProfilPicture() {
    this.picturePath = `/images/candidates/${this.candidateID}`;
    this.profilPicture = newElement('img', {
      class: 'candidate-figure__picture',
      src: this.picturePath,
      alt: `${this.data.name} Profile picture`,
    });
  }

  createMoreDetailsButtonWrapper() {
    this.createMoreDetailsButton();
    this.moreDetailsWrapper = newElement(
      'div',
      { class: 'candidate-card__more-details' },
      [this.moreDetailsButton],
    );
  }

  createMoreDetailsButton() {
    this.moreDetailsButton = newElement(
      'button',
      {
        class: 'btn more-details-btn',
        title: `Click to see more about ${this.data.name}`,
        'data-id': this.candidateID,
      },
      ['More details...'],
    );
  }

  createMoreInfoButton() {
    this.moreInfoButton = newElement(
      'button',
      { class: 'info-indicator', title: 'Click to see more info' },
      [newElement('i', { class: 'fas fa-info-circle' })],
    );

    this.moreInfoBtnWrapper = newElement(
      'div',
      { class: 'info-indicator-wrapper' },
      [this.moreInfoButton],
    );
  }
}

/**
@html code
<div class="candidate-card">
  <figure class="candidate-card__figure candidate-figure">
    <div class="candidate-figure__top-details">
      <img
        src="/images/candidates/candidate.png"
        alt="Mohamed Faouzi profile"
        class="candidate-figure__picture"
      />
      <div class="candidate-card__more-details">
        <button
          class="btn more-details-btn"
          title="Click to see more details about Mohamed Faouzi"
        >
          More details...
        </button>
      </div>
      <div class="info-indicator-wrapper">
        <button class="info-indicator">
          <i class="fas fa-info-circle"></i>
        </button>
      </div>
    </div>
    <figcaption class="candidate-description">
      <span class="candidate-description__name">Mohamed Faouzi</span>
      <small class="candidate-description__skills">
        Web dev | Software engineer
      </small>
    </figcaption>
  </figure>
  <button class="btn vote-btn btn-primary">Vote now</button>
</div>
**/
