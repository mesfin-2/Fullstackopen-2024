const dummy = (bloogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  return blogs.reduce((total, blog) => total + blog.likes, 0);
};

module.exports = {
  dummy,
  totalLikes,
};
const favoriteBlog = (blogs) => {
  // Check if the array is empty
  if (blogs.length === 0) {
    return null; // Return null if the array is empty
  }

  // Find the blog with the maximum number of likes
  const maxLikesBlog = blogs.reduce((prev, current) =>
    prev.likes > current.likes ? prev : current
  );

  return {
    title: maxLikesBlog.title,
    author: maxLikesBlog.author,
    likes: maxLikesBlog.likes,
  };
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
};
