const renderFormSuccess = (elements, i18n) => {
  const {
    input,
    form,
    feedback,
    submitButton,
  } = elements;
  submitButton.disabled = false;
  input.classList.remove('is-invalid');
  feedback.classList.remove('text-danger');
  feedback.classList.add('text-success');
  feedback.textContent = i18n.t('feedback.success');
  form.reset();
  input.focus();
};

export default renderFormSuccess;
