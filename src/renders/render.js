import renderFormError from './renderFormError.js';
import renderContent from './renderContent.js';
import renderFormSuccess from './renderFormSuccess.js';
import { renderModalOpen, renderModalClose, renderModalContent } from './renderModalContent.js';

export default (state, elements, i18n) => (path, value) => {
  if (path === 'formStatus') {
    switch (value) {
      case 'sending':
        elements.submitButton.disabled = true;
        break;
      case 'finished':
        elements.submitButton.disabled = false;
        renderFormSuccess(elements, i18n);
        renderContent(state, elements, i18n);
        break;
      case 'failed':
        elements.submitButton.disabled = false;
        renderFormError(state, elements, i18n);
        break;
      default:
        throw new Error(`Unknown state: ${value}`);
    }
  }
  if (path === 'modalStatus') {
    switch (value) {
      case 'open':
        renderModalOpen(elements);
        renderModalContent(state, elements, i18n);
        break;
      case 'close':
        renderModalClose(elements);
        break;
      default:
        throw new Error(`Unknown state: ${value}`);
    }
  }
  return state;
};
