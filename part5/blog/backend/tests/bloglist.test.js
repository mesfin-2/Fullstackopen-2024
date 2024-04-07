const { test } = require("node:test");
const assert = require("node:assert");
const list = require("../utils/list_helper");

test("dummy returns one", () => {
  const blogs = [];
  const result = list.dummy(blogs);
  assert.strictEqual(result, 1);
});

test("of empty list is zero", () => {
  const result = list.totalLikes([]);
  assert.strictEqual(result, 0);
});
test("When list has only one blog, equals the likes of that", () => {
  const blogs = [
    {
      _id: "65e6bced8c52c72162f32fbb",
      title: "MERN app guideline",
      author: "Mesfin T",
      url: "https://blog.nextideatech.com/how-to-get-started-with-the-mern-stack-a-comprehensive-guide/",
      likes: 2,
      __v: 0,
    },
  ];

  const result = list.totalLikes(blogs);
  assert.strictEqual(result, 2);
});

test("of bigger list is calculated right", () => {
  const blogs = [
    {
      _id: "65e6bced8c52c72162f32fbb",
      title: "MERN app guideline",
      author: "Mesfin T",
      url: "https://blog.nextideatech.com/how-to-get-started-with-the-mern-stack-a-comprehensive-guide/",
      likes: 2,
      __v: 0,
    },
    {
      _id: "65e6bced8c52c72162f32fba",
      title: "React Best Practices",
      author: "John Doe",
      url: "https://react-best-practices.com",
      likes: 5,
      __v: 0,
    },
  ];

  const result = list.totalLikes(blogs);
  assert.strictEqual(result, 7);
});

test("of which blog has the most likes", () => {
  const blogs = [
    {
      _id: "65e6bced8c52c72162f32fbb",
      title: "MERN app guideline",
      author: "Mesfin T",
      url: "https://blog.nextideatech.com/how-to-get-started-with-the-mern-stack-a-comprehensive-guide/",
      likes: 2,
      __v: 0,
    },
    {
      _id: "65e6bced8c52c72162f32fba",
      title: "React Best Practices",
      author: "John Doe",
      url: "https://react-best-practices.com",
      likes: 5,
      __v: 0,
    },
    {
      _id: "65e6bced8c52c72162f32fbf",
      title: " Best Practices",
      author: "Tom Doe",
      url: "https://react-best-practices.com",
      likes: 5,
      __v: 0,
    },
  ];
  const expected = {
    author: "Tom Doe",
    likes: 5,
  };

  const result = list.mostLikes(blogs);
  assert.deepStrictEqual(result, expected);
});

test("of empty list is null", () => {
  const result = list.mostLikes([]);
  assert.strictEqual(result, null);
});

test("of which author has the most blogs", () => {
  const blogs = [
    {
      _id: "65e6bced8c52c72162f32fbb",
      title: "MERN app guideline",
      author: "Mesfin T",
      url: "https://blog.nextideatech.com/how-to-get-started-with-the-mern-stack-a-comprehensive-guide/",
      likes: 2,
      __v: 0,
    },
    {
      _id: "65e6bced8c52c72162f32fba",
      title: "React Best Practices",
      author: "John Doe",
      url: "https://react-best-practices.com",
      likes: 5,
      __v: 0,
    },
    {
      _id: "65e6bced8c52c72162f32fba",
      title: "React Best Practices",
      author: "John Doe",
      url: "https://react-best-practices.com",
      likes: 4,
      __v: 0,
    },
  ];
  const expected = {
    author: "John Doe",
    blogs: 2,
  };

  const result = list.mostBlogs(blogs);
  assert.deepStrictEqual(result, expected);
});
