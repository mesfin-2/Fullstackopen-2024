const Blog = require("../models/blog");

const initialBlogs = [
  {
    title: "MERN app guideline",
    author: "Mesfin T",
    url: "https://blog.nextideatech.com/how-to-get-started-with-the-mern-stack-a-comprehensive-guide/",
    likes: 2,
  },
  {
    title: "Good Frontend Developer",
    author: "Mesfin",
    url: "https://blog.nextideatech.com/how-to-get-started-with-the-mern-stack-a-comprehensive-guide/",
    likes: 2,
  },
  {
    title: "Good Frontend Developer",
    author: "Mesfin",
    url: "https://blog.nextideatech.com/how-to-get-started-with-the-mern-stack-a-comprehensive-guide/",
    likes: 2,
  },
];

//function that can be used for checking the blogs stored in the database.
const blogsInDb = async () => {
  const blogs = await Blog.find({});

  return blogs.map((blog) => blog.toJSON());
};

module.exports = {
  initialBlogs,
  blogsInDb,
};
