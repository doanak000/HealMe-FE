import axios from "axios";

// Create an Axios instance for authenticated requests
const authAxios = axios.create({
  baseURL: process.env.REACT_APP_ENDPOINT,
  headers: {
    Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
  },
});

// Create an Axios instance for non-authenticated requests
const nonAuthAxios = axios.create({
  baseURL: process.env.REACT_APP_ENDPOINT,
});

// Define functions for each API call
export const login = async (credentials) => {
  const response = await nonAuthAxios.post("/users/api/login", credentials);
  return response.data;
};

export const register = async (credentials) => {
  const response = await nonAuthAxios.post("/users/api/register", credentials);
  return response.data;
};

export const getUserProfile = async () => {
  const response = await authAxios.get("/users/me");
  return response.data;
};

export const getAllUsers = async () => {
  const response = await authAxios.get("/users");
  return response.data;
};

export const updateUser = async (userId, userData) => {
  const response = await authAxios.put(`/users/${userId}`, userData);
  return response.data;
};

// Export all API call functions
export default {
  login,
  getUserProfile,
  getAllUsers,
  updateUser,
};
