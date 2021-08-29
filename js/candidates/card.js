import { newElement } from '../utils/dom-utils.js';

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

    this.metadataLabels = {
      en: {
        voteNow: 'Vote now',
        moreDetails: 'More details...',
        seeMoreAbout: 'Click to see more about',
      },
      fr: {
        voteNow: 'Voter maintenant',
        moreDetails: 'Plus de détails...',
        seeMoreAbout: "Cliquez pour voir plus d'informations sur",
      },
    };

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

  getDataName() {
    return this.data.name;
  }
  getDataSkills() {
    return this.skills;
  }

  getDataId() {
    return this.candidateID;
  }

  getDataBio() {
    return this.data.description[this.lang].details;
  }
  getDataDepositionDate() {
    return this.data.description.depositionDate;
  }

  getDataPosition() {
    return this.data.description.position;
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
    const voteText = this.metadataLabels[this.lang].voteNow;
    this.voteButton = newElement(
      'button',
      { class: 'btn vote-btn btn-primary', title: 'Click to vote' },
      [voteText],
    );
  }

  createImageWrapper() {
    this.createProfilPicture();
    this.createMoreDetailsButtonWrapper();
    this.createInfoIndicator();
    this.imageWrapper = newElement(
      'div',
      { class: 'candidate-figure__top-details' },
      [this.profilPicture, this.moreDetailsWrapper, this.infoIndicatorWrapper],
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
    this.skills = this.data.description[this.lang].skills;
    const skills = this.skills.join(' | ');
    this.candidateDetails = newElement(
      'small',
      { class: 'candidate-description__skills' },
      [skills],
    );
  }

  createProfilPicture(ROOT = '') {
    this.picturePath = `${ROOT}/images/candidates/${this.candidateID}`;
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
    const moreDetailsText = this.metadataLabels[this.lang].moreDetails;
    const altText = this.metadataLabels[this.lang].seeMoreAbout;
    this.moreDetailsButton = newElement(
      'button',
      {
        class: 'btn more-details-btn',
        title: `${altText} ${this.data.name}`,
        'data-id': this.candidateID,
      },
      [moreDetailsText],
    );
  }

  createInfoIndicator() {
    this.infoIndicator = newElement(
      'div',
      { class: 'info-indicator', tabindex: -1 },
      [newElement('i', { class: 'fas fa-info-circle' })],
    );

    this.infoIndicatorWrapper = newElement(
      'div',
      { class: 'info-indicator-wrapper' },
      [this.infoIndicator],
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
        <button class="info-indicator" tabindex="-1">
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
