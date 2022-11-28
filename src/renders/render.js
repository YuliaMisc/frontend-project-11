import renderContent from './renderContent.js';
import renderForm from './renderForm.js';
import renderModalContent from './renderModalContent.js';

export default (state, elements, i18n) => (path) => {
  switch (path) {
    case 'form.status':
    case 'form.error':
      renderForm(state, elements, i18n);
      break;
    case 'modalPostId':
      renderModalContent(state, elements, i18n);
      break;
    case 'feeds':
    case 'posts':
      renderContent(state, elements, i18n);
      break;
    case 'postsVisits':
      renderContent(state, elements, i18n);
      break;
    default:
      throw new Error(`Unknown path: ${path}`);
  }
};
