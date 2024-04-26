import { useState, useEffect, useRef } from "react";
import blogService from "./services/blogs";
import loginService from "./services/login";
import LoginForm from "./components/LoginForm";
import BlogForm from "./components/BlogForm";
import LogOut from "./components/LogOut";
import Notification from "./components/Notification";
import "./index.css";
import BlogList from "./components/BlogList";
import Togglable from "./components/Togglable";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [errorMessage, setErrorMessage] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  const blogFormRef = useRef();

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

  const addBlog = (blogObject) => {
    blogFormRef.current.toggleVisibility();

    blogService.create(blogObject).then((returnedBlog) => {
      setBlogs(blogs.concat(returnedBlog));

      setSuccessMessage(`blog created successfully  ${blogObject.title}`);
      setTimeout(() => {
        setSuccessMessage(null);
      }, 1000);
    });
  };

  //Update likes

  // const update = async (blog) => {
  //   const updatedBlog = await blogService.updateLikes(blog.id, {
  //     ...blog,
  //     likes: blog.likes + 1,
  //   });
  //   setBlogs(blogs.map((b) => (b.id !== blog.id ? b : updatedBlog)));
  // };
  const update = async (blog) => {
    console.log("beforeUpdateBlog", blogs);
    const updatedBlog = await blogService.updateLikes(blog.id, {
      ...blog,
      likes: blog.likes + 1,
    });
    setBlogs(blogs.map((b) => (b.id !== blog.id ? b : updatedBlog)));
    console.log("afterUpdateBlog", blogs);
  };

  //handle login
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

      {user === null ? (
        <Togglable buttonLabel="Login">
          <LoginForm
            username={username}
            password={password}
            setUsername={setUsername}
            setPassword={setPassword}
            handleLogin={handleLogin}
          />
        </Togglable>
      ) : (
        <div>
          <p>Welocome - {user.name} </p>
          <Togglable buttonLabel="create new blog" ref={blogFormRef}>
            <LogOut handleLogOut={handleLogOut} />
            <BlogForm createBlog={addBlog} />
          </Togglable>
        </div>
      )}
      <BlogList blogs={blogs} update={update} />
    </div>
  );
};

export default App;
