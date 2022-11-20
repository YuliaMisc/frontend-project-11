import renderContent from './renderContent.js';
import processingForm from './processingForm.js';
import renderModalContent from './renderModalContent.js';

export default (state, elements, i18n) => (path) => {
  switch (path) {
    case 'formStatus':
      processingForm(state, elements, i18n);
      break;
    case 'postsVisits':
      renderModalContent(state, elements, i18n);
      break;
    case 'feeds':
    case 'posts':
      renderContent(state, elements, i18n);
      break;
    default:
      throw new Error(`Unknown path: ${path}`);
  }
};
