import { useState, useEffect } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import loginService from "./services/login";
import LoginForm from "./components/LoginForm";
import BlogForm from "./components/BlogForm";
import LogOut from "./components/LogOut";
import Notification from "./components/Notification";
import "./index.css";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    url: "",
    likes: 0,
  });
  const [errorMessage, setErrorMessage] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogappUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const addBlog = (e) => {
    e.preventDefault();

    //add new Blog Post
    const blogObject = {
      title: formData.title,
      author: formData.author,
      url: formData.url,
      likes: formData.likes,
    };
    blogService.create(blogObject).then((returnedNote) => {
      setBlogs(blogs.concat(returnedNote));

      setSuccessMessage(`blog created successfully  ${blogObject.title}`);
      setTimeout(() => {
        setSuccessMessage(null);
      }, 1000);

      setFormData({
        title: "",
        author: "",
        url: "",
        likes: 0,
      });
      console.log(formData);
    });
  };
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const user = await loginService.login({
        username,
        password,
      });
      window.localStorage.setItem("loggedBlogappUser", JSON.stringify(user));
      blogService.setToken(user.token);
      setUser(user);
      setSuccessMessage("Successfully LoggedIn");
      setTimeout(() => {
        setSuccessMessage(null);
      }, 5000);
      setUsername("");
      setPassword("");
    } catch (exception) {
      setErrorMessage("wrong username or password");
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
  };

  const handleLogOut = () => {
    window.localStorage.removeItem("loggedBlogappUser");
    setUser(null);
  };

  return (
    <div>
      {errorMessage && <Notification errormessage={errorMessage} />}
      {successMessage && <Notification successmessage={successMessage} />}
      <h1>Login</h1>
      {user === null ? (
        <LoginForm
          username={username}
          password={password}
          setUsername={setUsername}
          setPassword={setPassword}
          handleLogin={handleLogin}
        />
      ) : (
        <div>
          <p>Welocome - {user.name} </p>
          <LogOut handleLogOut={handleLogOut} />
          <BlogForm
            formData={formData}
            handleInputChange={handleInputChange}
            addBlog={addBlog}
          />
        </div>
      )}
      <h2>blogs</h2>
      {blogs?.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </div>
  );
};

export default App;
