import onChange from 'on-change';
import * as yup from 'yup';
import i18n from 'i18next';
import uniqueId from 'lodash/uniqueId.js';
import resources from './locales/index.js';
import render from './renders/render.js';
import getData from './getData.js';
import parse from './parse.js';

const validate = (link, collection) => {
  const schemaStr = yup.string().required().url().trim();
  const schemaMix = yup.mixed().notOneOf(collection);
  return schemaStr.validate(link)
    .then((url) => schemaMix.validate(url));
};

export default () => {
  const i18next = i18n.createInstance();
  i18next.init({
    lng: 'ru',
    debug: true,
    resources,
  });

  const elements = {
    body: document.querySelector('body'),
    form: document.querySelector('form'),
    input: document.querySelector('#url-input'),
    submitButton: document.querySelector('[type="submit"]'),
    feedback: document.querySelector('.feedback'),
    postsContainer: document.querySelector('.posts'),
    feedsContainer: document.querySelector('.feeds'),
    modal: {
      modal: document.querySelector('.modal'),
      modalTitle: document.querySelector('.modal-title'),
      modalDescr: document.querySelector('.modal-body'),
      modalRead: document.querySelector('.modal-read'),
      modalClose: {
        buttonClose: document.querySelector('.close'),
        buttonCloseRead: document.querySelector('.btn-secondary'),
      },
    },
  };

  const state = {
    formStatus: 'filling',
    rssLinks: [],
    feeds: [],
    posts: [],
    postsVisits: [],
    idCurrentOpenWindow: '',
    error: '',
  };

  const watchedState = onChange(state, render(state, elements, i18next));

  const updatePosts = () => {
    const promises = state.rssLinks.map((url) => {
      getData(url)
        .then((rss) => {
          const updatingFeed = state.feeds.find((feed) => feed.rssLinks === url);
          const { feed, posts } = parse(rss.data.contents);
          feed.id = updatingFeed.id;
          const newPosts = posts.filter((post) => {
            const collPostsLinks = state.posts.map((postInState) => postInState.postLink);
            return !collPostsLinks.includes(post.postLink);
          });

          newPosts.forEach((post) => {
            post.postId = uniqueId();
            post.feedId = feed.id;
          });
          watchedState.posts = [...state.posts, ...newPosts];
        })
        .catch((error) => {
          console.log(`Error: ${error.message}`);
        });
      return state;
    });
    Promise.all(promises)
      .finally(setTimeout(() => {
        updatePosts();
      }, 5000));
  };

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
    watchedState.formStatus = 'sending';
    const formData = new FormData(e.target);
    const url = formData.get('url');
    validate(url, state.rssLinks)
      .then((validUrl) => getData(validUrl))
      .then((rss) => {
        const parsedRss = parse(rss.data.contents);
        addRss(parsedRss, url);
        state.rssLinks.push(url);
        state.error = '';
        watchedState.formStatus = 'finished';
      }).catch((err) => {
        state.error = err.type ?? err.message.toLowerCase();
        watchedState.formStatus = 'failed';
      });
  });

  elements.postsContainer.addEventListener('click', (event) => {
    const { id } = event.target.dataset;
    state.idCurrentOpenWindow = id;
    watchedState.postsVisits.push(id);
  });

  updatePosts();
};
