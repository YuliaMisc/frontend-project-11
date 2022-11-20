const renderModalContent = (state, elements, i18n) => {
  const { modalTitle, modalDescr, modalRead } = elements.modal;
  const { buttonCloseRead } = elements.modal.modalClose;

  const currentPost = state.posts.find((post) => post.postId === state.idCurrentOpenWindow);
  modalTitle.textContent = currentPost.postTitle;
  modalDescr.textContent = currentPost.postDescr;
  modalRead.setAttribute('href', `${currentPost.postLink}`);
  modalRead.textContent = i18n.t('modal.read');
  buttonCloseRead.textContent = i18n.t('modal.close');

  const postElem = document.querySelector(`[data-id="${currentPost.postId}"]`);
  postElem.classList.remove('fw-bold');
  postElem.classList.add('fw-normal', 'link-secondary');
};

export default renderModalContent;
