const renderFormSuccess = (elements, i18n) => {
  const { input, form, feedback } = elements;
  input.classList.remove('is-invalid');
  feedback.classList.remove('text-danger');
  feedback.classList.add('text-success');
  feedback.textContent = i18n.t('feedback.success');
  form.reset();
  input.focus();
};

const renderFormError = (elements, i18n) => {
  const { input, feedback } = elements;

  input.classList.add('is-invalid');
  feedback.classList.remove('text-success');
  feedback.classList.add('text-danger');

  feedback.textContent = i18n.t('feedback.invalidUrl');
};

export default (state, elements, i18n) => (path, value) => {
  if (path === 'formStatus') {
    switch (value) {
      case 'valid':
        renderFormSuccess(elements, i18n);
        break;
      case 'invalid':
        renderFormError(elements, i18n);
        break;
      default:
        throw new Error(`Unknown state: ${value}`);
    }
  }
  return state;
};
