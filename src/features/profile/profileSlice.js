import { createSlice } from "@reduxjs/toolkit";
import { authAxios, http, nonAuthAxios } from "../../api/api";
import { Notification } from "../../components/Notification/Notification";
import { NOTIFICATION_TYPE } from "../../constants/common";

const initialState = {
  userProfile: null,
  patientProfile: null,
};

const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    getUserProfileAction: (state, action) => {
      state.userProfile = action.payload;
    },
    getPatientProfileAction: (state, action) => {
      state.patientProfile = action.payload;
    },
  },
});

export const { getPatientProfileAction, getUserProfileAction } =
  profileSlice.actions;

export default profileSlice.reducer;

export const getUserProfileApi = (userId) => {
  return async (dispatch) => {
    try {
      const result = await nonAuthAxios.get(`/users/api/view/${userId}`);
      console.log(result.data);
      dispatch(getUserProfileAction(result.data[0]));
    } catch (error) {
      console.log(error);
    }
  };
};

export const getPatientProfileApi = (profileId) => {
  return async (dispatch) => {
    try {
      const result = await authAxios.get(`/patient/${profileId}`);
      if (result.data.length === 0) {
        Notification({
          type: NOTIFICATION_TYPE.ERROR,
          message: "You must be register patient to have profile info",
          description: null,
        });
        return;
      }
      dispatch(getPatientProfileAction(result.data[0][0]));
    } catch (error) {
      console.log(error);
    }
  };
};

export const updatePatientProfileApi = (patientId, values, callback) => {
  return async (dispatch) => {
    try {
      const res = await authAxios.post(
        `/patient/${patientId}/api/update`,
        values
      );
      if (callback) callback();
    } catch (error) {
      console.log(error);
    }
  };
};

export const updateUserProfileApi = (userId, values, callback) => {
  return async (dispatch) => {
    try {
      await authAxios.post(`/users/api/update/${userId}`, values);
      if (callback) callback();
    } catch (error) {
      console.log(error);
    }
  };
};
