import renderFormSuccess from './renderFormSuccess.js';
import renderFormError from './renderFormError.js';

const processingForm = (state, elements, i18n) => {
  switch (state.formStatus) {
    case 'sending':
      elements.submitButton.disabled = true;
      break;
    case 'finished':
      renderFormSuccess(elements, i18n);
      break;
    case 'failed':
      renderFormError(state, elements, i18n);
      break;
    default:
      throw new Error(`Unknown state: ${state.formStatus}`);
  }
};

export default processingForm;
