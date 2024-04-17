import React, { useState } from "react";

const BlogForm = ({ createBlog }) => {
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    url: "",
    likes: 0,
  });
  const [updateForm, setUpdateForm] = useState(false);

  const addBlog = (e) => {
    e.preventDefault();
    //add new Blog Post
    createBlog({
      title: formData.title,
      author: formData.author,
      url: formData.url,
      likes: formData.likes,
    });
    setFormData({
      title: "",
      author: "",
      url: "",
      likes: 0,
    });
  };
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  //update blog likes
  const updateLikes333 = async (id, updatedLikes) => {};
  return (
    <div>
      <form onSubmit={addBlog}>
        <div>
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor="author">Author:</label>
          <input
            type="text"
            id="author"
            name="author"
            value={formData.author}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor="url">URL:</label>
          <input
            type="text"
            id="url"
            name="url"
            value={formData.url}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor="likes">Likes:</label>
          <input
            type="number"
            id="likes"
            name="likes"
            value={formData.likes}
            onChange={handleInputChange}
          />
        </div>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default BlogForm;
