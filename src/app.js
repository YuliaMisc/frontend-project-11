import onChange from 'on-change';
import i18n from 'i18next';
import uniqueId from 'lodash/uniqueId.js';
import resources from './locales/index.js';
import render from './render.js';
import validate from './validate.js';
import getData from './getData.js';
import parse from './parse.js';

export default () => {
  const i18next = i18n.createInstance();
  i18next.init({
    lng: 'ru',
    debug: true,
    resources,
  });

  const elements = {
    form: document.querySelector('form'),
    input: document.querySelector('#url-input'),
    feedback: document.querySelector('.feedback'),
    postsContainer: document.querySelector('.posts'),
    feedsContainer: document.querySelector('.feeds'),
    modal: document.querySelector('.modal'),
  };

  const state = {
    formStatus: 'filling',
    rssLinks: [],
    feeds: [],
    posts: [],
    postsVisits: [],
    error: '',
  };

  const watchedState = onChange(state, render(state, elements, i18next));

  const addRss = (parsedRss, link) => {
    const { feed, posts } = parsedRss;
    feed.id = uniqueId();
    feed.rssLinks = link;
    watchedState.feeds.push(feed);
    posts.forEach((post) => {
      const feedId = feed.id;
      const postId = uniqueId();
      const { postTitle, postDescr, postLink } = post;
      watchedState.posts.push({
        postTitle, postDescr, postLink, feedId, postId,
      });
    });
  };

  elements.form.addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const url = formData.get('url');
    validate(url, state.rssLinks)
      .then((validUrl) => getData(validUrl))
      .then((rss) => {
        const parsedRss = parse(rss.data.contents);
        addRss(parsedRss, url);
        watchedState.rssLinks.push(url);
        watchedState.error = '';
        watchedState.formStatus = 'sending';
      }).catch((err) => {
        watchedState.error = err.type ?? err.message.toLowerCase();
        watchedState.formStatus = 'failed';
      });
  });
};
