import axios from "axios";

const baseUrl = "/api/blogs";
//const baseUrl = "http://localhost:3003/api/blogs";

let token = null;

const setToken = (newToken) => {
  token = `Bearer ${newToken}`;
  console.log("token-from-blog-service", token);
};
const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};
const create = async (newObject) => {
  const config = {
    headers: { Authorization: token },
  };

  const response = await axios.post(baseUrl, newObject, config);
  return response.data;
};

// const updateLikes = async (id, updatedLikes) => {
//   // const config = {
//   //   headers: { Authorization: token },
//   // };
//   const response = await axios.put(`${baseUrl}/${id}`, updatedLikes);
//   return response.data;
// };
const updateLikes = async (id, newBlog) => {
  const request = axios.put(`${baseUrl}/${id}`, newBlog);
  return request.then((res) => res.data);
};
export default { getAll, setToken, create, updateLikes };
