import { createSlice } from "@reduxjs/toolkit";
import { nonAuthAxios } from "../../api/api";

const initialState = {
  prescriptionDetail: null,
  prescriptions: [],
};

const prescriptionSlice = createSlice({
  name: "prescription",
  initialState,
  reducers: {
    getPrescriptionDetailByIdAction: (state, action) => {
      state.prescriptionDetail = action.payload;
    },
    getPrescriptionsOfPatientIdAction: (state, action) => {
      state.prescriptions = action.payload;
    },
  },
});

export const {
  getPrescriptionDetailByIdAction,
  getPrescriptionsOfPatientIdAction,
} = prescriptionSlice.actions;

export default prescriptionSlice.reducer;

export const getPrescriptionDetailByIdApi = (prescriptionId) => {
  return async (dispatch) => {
    try {
      const result = await nonAuthAxios.get(`/prescription/${prescriptionId}`);
      dispatch(getPrescriptionDetailByIdAction(result.data[0]));
    } catch (error) {
      console.log(error);
    }
  };
};

export const getPrescriptionsOfPatientIdApi = (patientId) => {
  return async (dispatch) => {
    try {
      const result = await nonAuthAxios.get(
        `/prescription/${patientId}/prescription`
      );
      console.log("listPrescriptions", result.data);
    } catch (error) {
      console.log(error);
    }
  };
};
