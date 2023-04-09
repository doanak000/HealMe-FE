import { createSlice } from "@reduxjs/toolkit";
import { nonAuthAxios } from "../../api/api";

const initialState = {
  provinces: [],
  districts: [],
  wards: [],
  provinceDetail: null,
  districtDetail: null,
};

const areaSlice = createSlice({
  name: "area",
  initialState,
  reducers: {
    getAllProvinceAction: (state, action) => {
      state.provinces = action.payload;
    },
    getProvinceByIdAction: (state, action) => {
      state.provinceDetail = action.payload;
    },
    getDistrictsInProvincesAction: (state, action) => {
      state.districts = action.payload;
    },
    getDistrictByIdAction: (state, action) => {
      state.districtDetail = action.payload;
    },
    getWardsInDistrictAction: (state, action) => {
      state.wards = action.payload;
    },
  },
});

export const {
  getAllProvinceAction,
  getProvinceByIdAction,
  getDistrictsInProvincesAction,
  getDistrictByIdAction,
  getWardsInDistrictAction,
} = areaSlice.actions;

export default areaSlice.reducer;

export const getAllProvinceApi = () => {
  return async (dispatch) => {
    try {
      const result = await nonAuthAxios.get(`/area/province`);
      dispatch(getAllProvinceAction(result.data));
    } catch (error) {
      console.log(error);
    }
  };
};

export const getProvinceByIdApi = (provinceId) => {
  return async (dispatch) => {
    try {
      const result = await nonAuthAxios.get(`/area/province/${provinceId}`);
      dispatch(getProvinceByIdAction(result.data));
    } catch (error) {
      console.log(error);
    }
  };
};

export const getDistrictsInProvincesApi = (provinceId) => {
  return async (dispatch) => {
    try {
      const result = await nonAuthAxios.get(
        `/area/province/${provinceId}/district`
      );
      dispatch(getDistrictsInProvincesAction(result.data[0]));
    } catch (error) {
      console.log(error);
    }
  };
};

export const getDistrictByIdApi = (districtId) => {
  return async (dispatch) => {
    try {
      const result = await nonAuthAxios.get(`/area/district/${districtId}`);
      dispatch(getDistrictByIdAction(result.data));
    } catch (error) {
      console.log(error);
    }
  };
};

export const getWardsInDistrictApi = (districtId) => {
  return async (dispatch) => {
    try {
      const result = await nonAuthAxios.get(
        `/area/district/${districtId}/ward`
      );
      dispatch(getWardsInDistrictAction(result.data[0]));
    } catch (error) {
      console.log(error);
    }
  };
};
