import axios from "axios";

const baseUrl = "http://localhost:3001/api/users";

const getAll = async () => {
  const { data } = await axios.get(baseUrl);
  return data;
};

const create = async (newObject) => {
  const { data } = await axios.post(baseUrl, newObject);
  return data;
};

export default { getAll, create };
