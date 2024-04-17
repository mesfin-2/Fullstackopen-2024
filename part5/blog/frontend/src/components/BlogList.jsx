import React from "react";
import Blog from "./Blog";

const BlogList = ({ blogs, update }) => {
  return (
    <div>
      <h2>Blogs</h2>
      {blogs?.map((blog) => (
        <Blog key={blog.id} blog={blog} update={() => update(blog)} />
      ))}
    </div>
  );
};

export default BlogList;
