const renderFormError = (state, elements, i18n) => {
  const { input, feedback, submitButton } = elements;
  submitButton.disabled = false;
  input.classList.add('is-invalid');
  feedback.classList.remove('text-success');
  feedback.classList.add('text-danger');
  switch (state.form.error) {
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
    case 'too Many Requests':
      feedback.textContent = i18n.t('feedback.tooManyRequests');
      break;
    default:
      feedback.textContent = i18n.t('feedback.invalidUnknown');
  }
};

export default renderFormError;
