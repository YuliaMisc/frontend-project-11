export default (state, elements) => (path, value) => {
  const { input, feedback } = elements;

  if (path === 'formStatus') {
    switch (value) {
      case 'valid':
        input.classList.remove('is-invalid');
        feedback.textContent = '';
        break;
      case 'invalid':
        input.classList.add('is-invalid');
        feedback.textContent = 'Ссылка должна быть валидным URl';
        break;
      default:
        throw new Error(`Unknown state: ${value}`);
    }
  }
  return state;
};
