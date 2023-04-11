import { createSlice } from "@reduxjs/toolkit";
import { authAxios, http } from "../../api/api";
import { Notification } from "../../components/Notification/Notification";
import { NOTIFICATION_TYPE } from "../../constants/common";

const initialState = {
  userInfo: JSON.parse(localStorage.getItem("userInfo")) || null,
  patientProfile: JSON.parse(localStorage.getItem("patientProfile")),
};

const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    getPatientProfileAction: (state, action) => {
      state.patientProfile = action.payload;
    },
  },
});

export const { getPatientProfileAction } = profileSlice.actions;

export default profileSlice.reducer;

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
      localStorage.setItem("patientProfile", JSON.stringify(result.data[0][0]));
      dispatch(getPatientProfileAction(result.data[0][0]));
    } catch (error) {
      console.log(error);
    }
  };
};

export const updatePatientProfileApi = (patientId, values) => {
  return async (dispatch) => {
    try {
      await authAxios.post(`/patient/${patientId}/api/update`, values);
    } catch (error) {
      console.log(error);
    }
  };
};
