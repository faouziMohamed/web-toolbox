import { capitalizeAll, newElement } from '../utils/dom-utils.js';
const defaultArg = {
  id: -1,
  name: '',
  email: '',
  description: {
    en: { details: '', skills: [''] },
    position: 'n/a',
    depositionDate: '',
  },
};
export class CandidateDetails {
  constructor(candidateData = defaultArg, lang = 'en') {
    this.data = candidateData;
    this.candidateId = candidateData.id;
    this.lang = lang;
    this.metadataLabels = {
      en: {
        name: 'Name',
        position: 'Position',
        depositionDate: 'Deposition Date',
        skills: 'Skills',
        noSkills: 'None',
        noDeposition: 'No deposition date',
      },
      fr: {
        name: 'Nom',
        position: 'Position',
        depositionDate: 'Date de dépôt',
        skills: 'Compétences',
        noSkills: 'Aucune',
        noDeposition: 'Pas de date de dépôt',
      },
    };
    this.create();
  }

  create() {
    this.createCandidateRow();
  }
  getDataId() {
    return this.data.id;
  }

  getDataName() {
    return this.data.name;
  }

  getDataSkills() {
    return this.data.description[this.lang].skills;
  }

  getDataDepositionDate() {
    return this.data.description.depositionDate;
  }

  getDataPosition() {
    return this.data.description.position;
  }

  getPicturePath(ROOT = '') {
    return `${ROOT}/images/candidates/${this.data.id}`;
  }

  getDataBio() {
    return this.data.description[this.lang].details;
  }

  getDetails() {
    return this.candidateRow;
  }

  getOverlay() {
    return this.detailsOverlay;
  }

  createCandidateRow() {
    this.createDetailsOverlay();
    this.createCandidatePicture();
    this.createCandidateDetails();

    this.candidateRow = newElement('div', { class: 'candidate-row' }, [
      this.detailsOverlay,
      this.candidatePicture,
      this.candidateDetails,
    ]);
  }

  createDetailsOverlay() {
    this.createInfoIndicator();
    this.detailsOverlay = newElement(
      'div',
      { class: 'candidate-row__overlay', 'data-id': this.data.id, tabindex: 0 },
      [this.infoIndicatorWrapper],
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

  createCandidatePicture() {
    this.createImg();
    this.candidatePicture = newElement('div', { class: 'candidate-picture' }, [
      this.candidatePicture,
    ]);
  }

  createImg(ROOT = '') {
    this.candidatePicture = newElement('img', {
      class: 'candidate-picture__img',
      src: `${ROOT}/images/candidates/${this.data.id}`,
      alt: `${this.data.name}'s picture`,
      width: '100',
    });
  }

  createCandidateDetails() {
    this.createName();
    this.createPositionStatus();
    this.createDeposition();
    this.createkills();
    this.candidateDetails = newElement('div', { class: 'candidate-details' }, [
      this.candidateName,
      this.candidatePosition,
      this.candidateDeposition,
      this.candidateSkills,
    ]);
  }

  createName() {
    this.candidateName = newElement('h3', { class: 'candidate-name' }, [
      this.data.name,
    ]);
  }

  createPositionStatus() {
    const position = this.metadataLabels[this.lang].position;
    const description = this.data.description.position?.toUpperCase() || 'N/A';
    this.candidatePosition = newElement('p', { class: 'candidate-position' }, [
      `${position}: `,
      description,
    ]);
  }

  createDeposition() {
    const deposition = this.metadataLabels[this.lang].depositionDate;
    const depositionDate =
      this.data.description.depositionDate ||
      this.metadataLabels[this.lang].noDeposition;

    this.createDepositionDate();
    this.candidateDeposition = newElement(
      'p',
      { class: 'candidate-deposition' },
      [`${deposition}: `, this.candidateDepositionDate],
    );
  }

  createDepositionDate() {
    let date = this.data.description.depositionDate;

    const options = {
      dateStyle: 'full',
    };
    date = new Intl.DateTimeFormat(this.lang, options).format(new Date(date));
    date = capitalizeAll(date);
    this.candidateDepositionDate = newElement(
      'time',
      { class: 'candidate-deposition--date' },
      [newElement('span', {}, [date])],
    );
  }

  createkills() {
    const skillsLabel = this.metadataLabels[this.lang].skills;

    this.createSkillsData();
    this.candidateSkills = newElement('p', { class: 'candidate-skills' }, [
      `${skillsLabel}: `,
      this.candidateSkillsData,
    ]);
  }

  createSkillsData() {
    this.skills = this.data.description[this.lang].skills;
    const skills = this.skills.join(', ');
    this.candidateSkillsData = newElement(
      'span',
      { class: 'candidate-skills--data' },
      [skills],
    );
  }
}

//<div class='candidate-row'>
//   <div class='candidate-row__overlay' tabindex='0' data-id='10190'>
//     <div class='info-indicator-wrapper'>
//       <div class='info-indicator' tabindex='-1'>
//         <i class='fas fa-info-circle'></i>
//       </div>
//     </div>
//   </div>
//   <div class='candidate-picture'>
//     <img
//       src='/images/candidates/10190'
//       alt="Faouzi Mohamed's picture"
//       width='100'
//       class='candidate-picture__img'
//     />
//   </div>
//   <div class='candidate-details'>
//     <h3 class='candidate-name'>Faouzi Mohamed</h3>
//     <p class='candidate-position'>Position: N/A</p>
//     <p class='candidate-deposition'>
//       Deposition Date:
//       <time class='candidate-deposition--date'>
//         <span>17/05/2021</span>
//       </time>
//     </p>
//     <p class='candidate-skills'>
//       Skills:
//       <span class='candidate-deposition--date'>
//         Data science, Software engineer, Big data, Cloud computing
//       </span>
//     </p>
//   </div>
//</div>
