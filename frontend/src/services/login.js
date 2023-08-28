import axios from "axios";

const baseUrl = "http://localhost:3001/api/login";

const login = async (credetials) => {
  const { data } = await axios.post(baseUrl, credetials);
  return data;
};

export default { login };
