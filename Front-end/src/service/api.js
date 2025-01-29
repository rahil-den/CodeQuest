import axios from "axios";

let url = "http://localhost:3000";

export const signUp = async (formData) => {
  try {
    const response = await axios.post(`${url}/adduser`, formData);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
}

export const login = async ({ email,password }) => {
    try {
        const response = await axios.post(`${url}/login`, { email,password });
        return response;
    } catch (error) {
        return error.response.data;
    }
    }