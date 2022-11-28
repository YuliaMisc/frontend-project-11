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
    const title = post.querySelector('title').textContent;
    const description = post.querySelector('description').textContent;
    const link = post.querySelector('link').textContent;
    posts.push({ title, description, link });
  });

  return {
    feed: {
      title: feedTitle, description: feedDescr,
    },
    posts,
  };
};

export default parse;
