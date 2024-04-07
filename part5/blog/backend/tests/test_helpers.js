const Blog = require("../models/blog");
const User = require("../models/user");

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

const initialUsers = [
  {
    username: "admin",
    name: "Admin T",
    password: "123456",
  },
];

//function that can be used for checking the blogs stored in the database.
const blogsInDb = async () => {
  const blogs = await Blog.find({});

  return blogs.map((blog) => blog.toJSON());
};
//function that can be used for checking the blogs stored in the database.
const usersInDb = async () => {
  const users = await User.find({});

  return users.map((user) => user.toJSON());
};

module.exports = {
  initialBlogs,
  blogsInDb,
  usersInDb,
  initialUsers,
};
