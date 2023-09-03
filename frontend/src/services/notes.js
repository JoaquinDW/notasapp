import axios from "axios";

const baseUrl = "http://localhost:3001/api/notes";

let token = null;

const setToken = (newToken) => {
  token = `bearer ${newToken}`;
};

const getAll = async () => {
  // Verifica si el usuario ha iniciado sesión y tiene un token válido
  const authenticatedUser = JSON.parse(
    localStorage.getItem("loggedNoteappUser")
  );
  if (!authenticatedUser || !authenticatedUser.token) {
    // Maneja el caso en el que el usuario no ha iniciado sesión
    return [];
  }

  const token = authenticatedUser.token;

  const config = {
    headers: { Authorization: `bearer ${token}` },
  };

  try {
    const response = await axios.get(baseUrl, config);
    console.log(response.data);
    return response.data;
  } catch (error) {
    // Maneja los errores de la solicitud, por ejemplo, error 401 (No autorizado)
    console.error("Error fetching data:", error);
    return [];
  }
};

const create = (newObject) => {
  const config = {
    headers: { Authorization: token },
  };
  const request = axios.post(baseUrl, newObject, config);
  return request.then((response) => response.data);
};

const update = (id, newObject) => {
  const config = {
    headers: { Authorization: token },
  };
  const request = axios.put(`${baseUrl}/${id}`, newObject, config);
  return request.then((response) => response.data);
};

const deleteNote = (id) => {
  const config = {
    headers: { Authorization: token },
  };
  const request = axios.delete(`${baseUrl}/${id}`, config);
  return request.then((response) => response.data);
};

export default { getAll, create, update, setToken, deleteNote };
