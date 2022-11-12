const renderFormSuccess = (elements, i18n) => {
  const { input, form, feedback } = elements;
  input.classList.remove('is-invalid');
  feedback.classList.remove('text-danger');
  feedback.classList.add('text-success');
  feedback.textContent = i18n.t('feedback.success');
  form.reset();
  input.focus();
};

const renderFormError = (state, elements, i18n) => {
  const { input, feedback } = elements;
  console.log(state.error);
  console.log(state);
  input.classList.add('is-invalid');
  feedback.classList.remove('text-success');
  feedback.classList.add('text-danger');
  switch (state.error) {
    case 'url':
      feedback.textContent = i18n.t('feedback.invalidUrl');
      break;
    case 'required':
      feedback.textContent = i18n.t('feedback.invalidRequired');
      break;
    case 'notOneOf':
      feedback.textContent = i18n.t('feedback.invalidNotOneOf');
      break;
    case 'network error':
      feedback.textContent = i18n.t('feedback.invalidNetwork');
      break;
    case 'invalid rss':
      feedback.textContent = i18n.t('feedback.invalidRSS');
      break;
    default:
      feedback.textContent = i18n.t('feedback.invalidUnknown');
  }
};

export default (state, elements, i18n) => (path, value) => {
  if (path === 'formStatus') {
    switch (value) {
      case 'valid':
        renderFormSuccess(elements, i18n);
        break;
      case 'invalid':
        renderFormError(state, elements, i18n);
        break;
      default:
        throw new Error(`Unknown state: ${value}`);
    }
  }
  return state;
};
