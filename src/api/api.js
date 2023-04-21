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
    maxWords: 500,
    creativity: 1,
  });
  return response.data;
};

export const registerWorkSchedule = async (data) => {
  const response = await authAxios.post("/schedule/api/create", data);
  return response.data;
};
export const getWorkSchedule = async (doctorId) => {
  const response = await authAxios.get(`/schedule/doc/${doctorId}`);
  return response.data;
};

export const updateWorkSchedule = async (id, data) => {
  const response = await authAxios.post(`/schedule/api/update/${id}`, data);
  return response.data;
};

export const deleteWorkSchedule = async (id) => {
  const response = await authAxios.post(`/schedule/api/delete/${id}`);
  return response.data;
};
export const getApptByScheduleId = async (id) => {
  const response = await authAxios.get(`/appt/sched/${id}`);
  return response.data;
};
export const createAppt = async (data) => {
  const response = await authAxios.post(`/appt/api/create`, data);
  return response.data;
};
export const cancelAppt = async (id) => {
  const response = await authAxios.post(`/appt/api/delete/${id}`);
  return response.data;
};
export const getAppt = async (id) => {
  const response = await authAxios.get(`/appt/pt/${id}`);
  return response.data;
};

export const getPresByApptId = async (id) => {
  const response = await authAxios.get(`/prescription/appt/${id}`);
  return response.data;
};
export const getPresDetail = async (id) => {
  const response = await authAxios.get(`/prescription/${id}`);
  return response.data;
};

export const getAllClinic = async () => {
  const response = await authAxios.get(`/clinic`);
  return response.data;
};
export const getAllPharmacy = async () => {
  const response = await authAxios.get(`/pharmacy`);
  return response.data;
};
export const getFilterClinicByDeptIdApi = async (data) => {
  const response = await authAxios.post("/clinic/search", data);
  return response.data;
};
export const getClinicInfoApi = async (clinicId) => {
  const response = await authAxios.get(`/clinic/${clinicId}`);
  return response.data;
};
export const createPres = async (data) => {
  const response = await authAxios.post(`/prescription/api/create`, data);
  return response.data;
};
export const getSearchMedicine = async (search) => {
  const response = await authAxios.post(`/medicine/search`, search);
  return response.data;
};
export const updateArrPres = async (id, data) => {
  const response = await authAxios.post(`/prescription/${id}/api/update`, data);
  return response.data;
};

export const getFilterPharmacy = async (data) => {
  const response = await authAxios.post(`/pharmacy/search`, data);
  return response.data;
};
export const updatePresDiagnois = async (id, data) => {
  const response = await authAxios.post(
    `/prescription/${id}/api/update/diagnosis`,
    data
  );
  return response.data;
};
export const getPatientProfileApi = async (id) => {
  const response = await authAxios.get(`/patient/${id}`);
  return response.data;
};
export const getFullAddressByWardIdApi = async (id) => {
  const response = await authAxios.get(`/area/ward/${id}`);
  return response.data;
};
export const updatePatientProfile = async (id, data) => {
  const response = await authAxios.post(`/patient/${id}/api/update`, data);
  return response.data;
};
export const updateAddress = async (id, data) => {
  const response = await authAxios.post(`/users/${id}/api/add-address`, data);
  return response.data;
};
export const getUserInfo = async (id) => {
  const response = await authAxios.get(`/users/api/get/${id}`);
  return response.data;
};
export const getClinicProfileApi = async (id) => {
  const response = await authAxios.get(`/clinic/${id}`);
  return response.data;
};
export const getPharmacyProfileApi = async (id) => {
  const response = await authAxios.get(`/pharmacy/${id}`);
  return response.data;
};
export const updateBusinessProfile = async (id, data) => {
  const response = await authAxios.post(`/business/${id}/api/update`, data);
  return response.data;
};

export const getPharmacyMedicine = async (id) => {
  const response = await authAxios.get(`/pharmacy/${id}/medicine`);
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
  registerWorkSchedule,
  getWorkSchedule,
  updateWorkSchedule,
  deleteWorkSchedule,
  getApptByScheduleId,
  createAppt,
  getPresByApptId,
  getPresDetail,
  getAllClinic,
  getAllPharmacy,
  getFilterClinicByDeptIdApi,
  createPres,
  getSearchMedicine,
  updateArrPres,
  getFilterPharmacy,
  updatePresDiagnois,
  getPatientProfileApi,
  getFullAddressByWardIdApi,
  updatePatientProfile,
  updateAddress,
  getUserInfo,
  getPharmacyProfileApi,
  getClinicProfileApi,
  updateBusinessProfile,
  getPharmacyMedicine,
};
