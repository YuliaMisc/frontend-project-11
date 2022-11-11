import * as yup from 'yup';
import onChange from 'on-change';
import render from './render.js';

const validate = (link, collection) => {
  const schemaStr = yup.string().required().url().trim();
  const schemaMix = yup.mixed().notOneOf(collection);
  return schemaStr.validate(link)
    .then((url) => schemaMix.validate(url));
};

export default () => {
  const elements = {
    form: document.querySelector('form'),
    input: document.querySelector('#url-input'),
    feedback: document.querySelector('.feedback'),
    postsContainer: document.querySelector('.posts'),
    feedsContainer: document.querySelector('.feeds'),
    modal: document.querySelector('.modal'),
  };

  const state = {
    formStatus: 'valid',
    rssLinks: [],
    feeds: [],
    posts: [],
    postsVisits: [],
  };

  const watchedState = onChange(state, render(state, elements));

  elements.form.addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const url = formData.get('url');
    validate(url, state.rssLinks)
      .then(() => {
        watchedState.rssLinks.push(url);
        watchedState.error = '';
        watchedState.formStatus = 'valid';
      }).catch(() => {
        watchedState.formStatus = 'invalid';
      });
  });
};
