export const renderModalOpen = (elements) => {
  const { body } = elements;
  const { modal } = elements.modal;

  const divEl = document.createElement('div');
  divEl.classList.add('modal-backdrop', 'fade', 'show');

  body.classList.add('modal-open');
  body.setAttribute('style', 'overflow: hidden; padding-right: 15px;');
  body.append(divEl);

  modal.classList.add('show');
  modal.setAttribute('style', 'display: block;');
  modal.setAttribute('aria-modal', 'true');
  modal.removeAttribute('aria-hidden');
  modal.setAttribute('role', 'dialog');
};

export const renderModalClose = (elements) => {
  const { body } = elements;
  const { modal } = elements.modal;

  const divEl = document.querySelector('.modal-backdrop');
  divEl.remove();

  body.classList.remove('modal-open');
  body.setAttribute('style', '');
  modal.classList.remove('show');
  modal.setAttribute('style', 'display: none');
  modal.setAttribute('aria-hidden', 'true');
  modal.removeAttribute('aria-modal');
  modal.removeAttribute('role');
};

export const renderModalContent = (state, elements, i18n) => {
  const { modalTitle, modalDescr, modalRead } = elements.modal;
  const { buttonCloseRead } = elements.modal.modalClose;

  const currentPost = state.posts.find((post) => post.postId === state.idCurrentOpenWindow);
  modalTitle.textContent = currentPost.postTitle;
  modalDescr.textContent = currentPost.postDescr;
  modalRead.setAttribute('href', `${currentPost.postLink}`);
  modalRead.textContent = i18n.t('modal.read');
  buttonCloseRead.textContent = i18n.t('modal.close');

  const postElem = document.querySelector(`[data-id="${currentPost.postId}"]`);
  postElem.classList.replace('fw-bold', 'fw-normal');
};
