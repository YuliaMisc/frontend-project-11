import { renderModalOpen, renderModalClose, renderModalContent } from './renderModalContent.js';

const processingModal = (state, elements, i18n) => {
  switch (state.modalStatus) {
    case 'open':
      renderModalOpen(elements);
      renderModalContent(state, elements, i18n);
      break;
    case 'close':
      renderModalClose(elements);
      break;
    default:
      throw new Error(`Unknown state: ${state.modalStatus}`);
  }
  return state;
};

export default processingModal;
