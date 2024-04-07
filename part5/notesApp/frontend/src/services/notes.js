import axios from "axios";
/*
both the frontend and the backend are at the same address,
 we can declare baseUrl as a relative URL.
*/
//const baseUrl = "/api/notes";
const baseUrl = "http://localhost:3004/api/notes";
//const baseUrl = "https://notesapp-0gom.onrender.com/api/notes";

//adding the token of the logged-in user to
//the Authorization header of the HTTP request.

let token = null;

const setToken = (newToken) => {
  token = `Bearer ${newToken}`;
  console.log("token-from-note-service", token);
};

const getAll = async () => {
  const response = await axios.get(baseUrl);
  console.log("data-from-notes-service", response.data);
  return response.data;
};

/*
create, now with async/await syntax, sets the token to the Authorization header.
 The header is given to axios as the third parameter of the post method.
*/
const create = async (newObject) => {
  const config = {
    headers: { Authorization: token },
  };
  const response = await axios.post(baseUrl, newObject, config);
  return response.data;
};

const update = (id, newObject) => {
  const request = axios.put(`${baseUrl}/${id}`, newObject);
  return request.then((response) => response.data);
};
const deleteNote = (id) => {
  const response = axios.delete(`${baseUrl}/${id}`);
  return response.data;
};

export default { getAll, create, update, deleteNote, setToken };
