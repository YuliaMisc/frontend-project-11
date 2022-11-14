const renderFeeds = (state) => {
  const { feeds } = state;
  const feedListEl = document.createElement('div');
  feedListEl.classList.add('card', 'border-0');

  const feedEl = document.createElement('div');
  feedEl.classList.add('card-body');
  feedEl.innerHTML = '<h2 class="card-title h4">Фиды</h2>';
  feedListEl.append(feedEl);

  const ulEl = document.createElement('ul');
  ulEl.classList.add('list-group', 'border-0', 'border-end-0');
  feedListEl.append(ulEl);

  feeds.forEach((feed) => {
    const liEl = document.createElement('li');
    const feedTitle = document.createElement('h3');
    const feedDescr = document.createElement('p');

    feedTitle.classList.add('h6', 'm-0');
    feedDescr.classList.add('m-0', 'small', 'text-black-50');

    feedTitle.textContent = feed.feedTitle;
    feedDescr.textContent = feed.feedDescr;

    liEl.append(feedTitle);
    liEl.append(feedDescr);

    ulEl.append(liEl);
  });
  return feedListEl;
};

const renderPosts = (state) => {
  const { posts } = state;
  const postsListEl = document.createElement('div');
  postsListEl.classList.add('card', 'border-0');

  const postEl = document.createElement('div');
  postEl.classList.add('card-body');
  postEl.innerHTML = '<h2 class="card-title h4">Посты</h2>';
  postsListEl.append(postEl);

  const ulEl = document.createElement('ul');
  ulEl.classList.add('list-group', 'border-0', 'rounded-0');
  postsListEl.append(ulEl);

  posts.forEach((post) => {
    const liEl = document.createElement('li');
    const postTitle = document.createElement('a');
    const postButton = document.createElement('button');

    liEl.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-start', 'border-0', 'border-end-0');

    postTitle.classList.add('fw-blod');
    postTitle.setAttribute('href', `${post.postLink}`);
    postTitle.setAttribute('data-id', `${post.postId}`);
    postTitle.setAttribute('target', '_blank');
    postTitle.setAttribute('rel', 'noopener noreferrer');

    postButton.classList.add('btn', 'btn-outline-primary', 'btn-sm');
    postButton.setAttribute('type', 'button');
    postButton.setAttribute('data-id', `${post.postId}`);
    postButton.setAttribute('data-bs-toggle', 'modal');
    postButton.setAttribute('data-bs-target', '#modal');

    postTitle.textContent = post.postTitle;
    postButton.textContent = 'Просмотр';

    liEl.append(postTitle);
    liEl.append(postButton);

    ulEl.append(liEl);
  });
  return postsListEl;
};

const renderFormSuccess = (elements, i18n) => {
  const { input, form, feedback } = elements;
  input.classList.remove('is-invalid');
  feedback.classList.remove('text-danger');
  feedback.classList.add('text-success');
  feedback.textContent = i18n.t('feedback.success');
  form.reset();
  input.focus();
};

const renderContent = (state, elements) => {
  const { feedsContainer, postsContainer } = elements;
  const feeds = renderFeeds(state);
  const posts = renderPosts(state);
  feedsContainer.append(feeds);
  postsContainer.append(posts);
};

const renderFormError = (state, elements, i18n) => {
  const { input, feedback } = elements;
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
      case 'sending':
        renderFormSuccess(elements, i18n);
        renderContent(state, elements);
        break;
      case 'failed':
        renderFormError(state, elements, i18n);
        break;
      default:
        throw new Error(`Unknown state: ${value}`);
    }
  }
  return state;
};
