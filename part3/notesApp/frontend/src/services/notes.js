import axios from "axios";
/*
both the frontend and the backend are at the same address,
 we can declare baseUrl as a relative URL.
*/
const baseUrl = "/api/notes";
//const baseUrl = "http://localhost:3001/api/notes";
//const baseUrl = "https://fullstackopen-2024.onrender.com/api/notes";

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then((response) => response.data);
};

const create = (newObject) => {
  const request = axios.post(baseUrl, newObject);
  return request.then((response) => response.data);
};

const update = (id, newObject) => {
  const request = axios.put(`${baseUrl}/${id}`, newObject);
  return request.then((response) => response.data);
};
const deleteNote = (id) => {
  const request = axios.delete(`${baseUrl}/${id}`);
  return request.then((response) => response.data);
};

export default { getAll, create, update, deleteNote };