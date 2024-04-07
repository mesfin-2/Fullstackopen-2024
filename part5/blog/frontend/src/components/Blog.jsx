const Blog = ({ blog }) => {
  return (
    <div className="blog">
      {blog.title} - {blog.author}
    </div>
  );
};

export default Blog;
