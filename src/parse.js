const parse = (data) => {
  const parser = new DOMParser();
  const doc = parser.parseFromString(data, 'application/xml');

  if (doc.querySelector('parsererror')) {
    throw new Error('invalid rss');
  }

  const feedTitle = doc.querySelector('title').textContent;
  const feedDescr = doc.querySelector('description').textContent;

  const posts = [];
  const postsEl = doc.querySelectorAll('item');
  postsEl.forEach((post) => {
    const postTitle = post.querySelector('title').textContent;
    const postDescr = post.querySelector('description').textContent;
    const postLink = post.querySelector('link').textContent;
    posts.push({ postTitle, postDescr, postLink });
  });

  return {
    feed: {
      feedTitle, feedDescr,
    },
    posts,
  };
};

export default parse;
