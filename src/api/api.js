import axios from "axios";

// Create an Axios instance for authenticated requests
export const authAxios = axios.create({
  baseURL: process.env.REACT_APP_ENDPOINT,
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
});

// Create an Axios instance for non-authenticated requests
export const nonAuthAxios = axios.create({
  baseURL: process.env.REACT_APP_ENDPOINT,
});

// Define functions for each API calls
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
  const response = await authAxios.post(
    `/users/api/update/${userId}`,
    userData
  );
  return response.data;
};

export const deleteUserById = async (userId) => {
  const response = await authAxios.post(`/users/api/delete/${userId}`);
  return response.data;
};

export const getAllProvince = async () => {
  const response = await nonAuthAxios.get("/area/province");
  return response.data;
};
export const getDistrictInProvince = async (provinceId) => {
  const response = await nonAuthAxios.get(
    `/area/province/${provinceId}/district`
  );
  return response.data;
};
export const getWardInDistrict = async (districtId) => {
  const response = await nonAuthAxios.get(`/area/district/${districtId}/ward`);
  return response.data;
};

export const createPatientProfile = async (data) => {
  const response = await nonAuthAxios.post("/patient/api/create", data);
  return response.data;
};

export const getChatbotResponse = async (data) => {
  const response = await nonAuthAxios.post("/chatbot", {
    question: data,
    maxWords: 100,
    creativity: 0.7,
  });
  return response.data;
};
// Export all API call functions
export default {
  login,
  getUserProfile,
  getAllUsers,
  updateUser,
  deleteUserById,
  getAllProvince,
  getDistrictInProvince,
  getWardInDistrict,
  createPatientProfile,
  getChatbotResponse,
};
