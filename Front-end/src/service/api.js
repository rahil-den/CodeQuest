import axios from "axios";

let url = "http://localhost:3000";
const token = localStorage.getItem("token");

export const signUp = async (formData) => {
  try {
    const response = await axios.post(`${url}/adduser`, formData);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
}

export const login = async ({ email, password }) => {
  try {
    const response = await axios.post(`${url}/login`, { email, password });
    return response;
  } catch (error) {
    return error.response.data;
  }
}

export const getUser = async () => {
  const response = await axios.get(`${url}/user/get`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `${token}`,
    },
  });
  return response.data;
}


export const updateUser = async (formData) => {
  const response = await axios.put(`${url}/user/update`, formData, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `${token}`,
    },
  });
  return response.data;
}