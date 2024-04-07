import axios from "axios";

//const baseUrl = "http://localhost:3001/api/auth/login";
const baseUrl = "/api/auth/login";

const login = async (credentials) => {
  const response = await axios.post(baseUrl, credentials);
  console.log("from-login-fe", response.data);
  return response.data;
};

export default { login };
