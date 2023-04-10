import { createSlice } from "@reduxjs/toolkit";
import { nonAuthAxios } from "../../api/api";
import { Notification } from "../../components/Notification/Notification";
import { NOTIFICATION_TYPE } from "../../constants/common";

const initialState = {
  userInfo: JSON.parse(localStorage.getItem("userInfo")) || null,
  patientProfile: null,
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
      const result = await nonAuthAxios.get(`/patient/${profileId}`);
      if (result.data.length === 0) {
        Notification({
          type: NOTIFICATION_TYPE.ERROR,
          message: "You must be register patient to have profile info",
          description: null,
        });
      }
      dispatch(getPatientProfileAction(result.data));
    } catch (error) {
      console.log(error);
      Notification({
        type: NOTIFICATION_TYPE.ERROR,
        message: "You must be register patient to have profile info",
        description: null,
      });
    }
  };
};
