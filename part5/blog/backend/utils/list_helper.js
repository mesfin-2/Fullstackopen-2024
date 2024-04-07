const dummy = (bloogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  return blogs.reduce((total, blog) => total + blog.likes, 0);
};

const mostLikes = (blogs) => {
  // Check if the array is empty
  if (blogs.length === 0) {
    return null; // Return null if the array is empty
  }

  // blog with the maximum number of likes
  const maxLikesBlog = blogs.reduce((prev, current) =>
    prev.likes > current.likes ? prev : current
  );

  return {
    author: maxLikesBlog.author,
    likes: maxLikesBlog.likes,
  };
};
//The function returns the author who has the largest amount of blogs
const mostBlogs = (blogs) => {
  // Check if the array is empty
  if (blogs.length === 0) {
    return null; // Return null if the array is empty
  }

  // Count occurrences of each author
  const blogCount = blogs.reduce((count, blog) => {
    count[blog.author] = (count[blog.author] || 0) + 1;
    return count;
  }, {});
  console.log("blogCount", blogCount);

  // author with the maximum number of blogs
  const maxBlogs = Object.keys(blogCount).reduce((a, b) =>
    blogCount[a] > blogCount[b] ? a : b
  );
  console.log("maxBlogs", maxBlogs);

  return {
    author: maxBlogs,
    blogs: blogCount[maxBlogs],
  };
};
module.exports = {
  dummy,
  totalLikes,
  mostLikes,
  mostBlogs,
};
