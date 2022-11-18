const getFeeds = (state, i18n) => {
  const { feeds } = state;
  const feedListEl = document.createElement('div');
  feedListEl.classList.add('card', 'border-0');

  const feedEl = document.createElement('div');
  feedEl.classList.add('card-body');
  feedEl.innerHTML = `<h2 class="card-title h4">${i18n.t('feeds')}</h2>`;
  feedListEl.append(feedEl);

  const ulEl = document.createElement('ul');
  ulEl.classList.add('list-group', 'border-0', 'border-end-0');
  feedListEl.append(ulEl);

  feeds.forEach((feed) => {
    const liEl = document.createElement('li');
    liEl.classList.add('list-group-item', 'border-0', 'border-end-0');
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

const getPosts = (state, i18n) => {
  const { posts } = state;
  const postsListEl = document.createElement('div');
  postsListEl.classList.add('card', 'border-0');

  const postEl = document.createElement('div');
  postEl.classList.add('card-body');
  postEl.innerHTML = `<h2 class="card-title h4">${i18n.t('posts')}</h2>`;
  postsListEl.append(postEl);

  const ulEl = document.createElement('ul');
  ulEl.classList.add('list-group', 'border-0', 'rounded-0');
  postsListEl.append(ulEl);

  posts.forEach((post) => {
    const liEl = document.createElement('li');
    const postTitle = document.createElement('a');
    const postButton = document.createElement('button');

    liEl.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-start', 'border-0', 'border-end-0');

    if (state.postsVisits.includes(post.postId)) {
      postTitle.classList.add('fw-normal', 'link-secondary');
    } else {
      postTitle.classList.add('fw-bold');
    }

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
    postButton.textContent = i18n.t('postButtonRead');

    liEl.append(postTitle);
    liEl.append(postButton);

    ulEl.append(liEl);
  });
  return postsListEl;
};

const renderContent = (state, elements, i18n) => {
  const { feedsContainer, postsContainer } = elements;
  feedsContainer.replaceChildren();
  postsContainer.replaceChildren();
  const feeds = getFeeds(state, i18n);
  const posts = getPosts(state, i18n);
  feedsContainer.append(feeds);
  postsContainer.append(posts);
};

export default renderContent;
