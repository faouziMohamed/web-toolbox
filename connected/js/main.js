import { lists } from './admin/usersList.js';
import { useCandidates } from './candidates/useModal-Candidates.js';
import { useDropDown, useHeaderMenu } from './header/index.header.js';

useDropDown('user-profil-thumb', 'user-menu-card');
useDropDown('lang-flag', 'lang-drop-down');
useHeaderMenu();
useCandidates();

lists();
