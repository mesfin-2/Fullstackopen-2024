import { useState } from "react";

const Blog = ({ blog, update }) => {
  const [visible, setVisible] = useState(false);

  const hideWhenVisible = { display: visible ? "none" : "" };
  const showWhenVisible = { display: visible ? "" : "none" };

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
    marginRight: 5,
  };

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  return (
    <div>
      <div style={hideWhenVisible}>
        <div>
          <h3 style={blogStyle}>
            {blog.title}
            <button style={{ marginLeft: "10px" }} onClick={toggleVisibility}>
              view
            </button>
          </h3>
        </div>
      </div>

      <div style={showWhenVisible}>
        <div style={blogStyle}>
          <h3>
            {blog.title}
            <button
              type="button"
              style={{ marginLeft: "10px" }}
              onClick={toggleVisibility}
            >
              hide
            </button>
          </h3>
          {blog.url}
          <br />
          likes {blog.likes}
          <button type="button" onClick={() => update(blog.id, blog.likes)}>
            like
          </button>
          <p>{blog.author}</p>
        </div>
      </div>
    </div>
  );
};

export default Blog;
