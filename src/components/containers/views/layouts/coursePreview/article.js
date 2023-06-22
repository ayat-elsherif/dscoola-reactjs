function Article({ articleUrl }) {
  window.scrollTo(0, 0);

  return (
    <iframe
      className="article"
      src={articleUrl}
      frameBorder="10"
      scrolling="auto"
      height="100%"
      width="100%"
    ></iframe>
  );
}

export default Article;
