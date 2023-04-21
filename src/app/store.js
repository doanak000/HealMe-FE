import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "../features/counter/counterSlice";
import loginReducer from "../features/login/loginSlice";
import languageReducer from "../features/language/languageSlice";
import registerReducer from "../features/register/registerSlice";
import profileReducer from "../features/profile/profileSlice";
import prescriptionReducer from "../features/prescription/prescriptionSlice";
export default configureStore({
  reducer: {
    counter: counterReducer,
    login: loginReducer,
    language: languageReducer,
    register: registerReducer,
    profile: profileReducer,
    prescription: prescriptionReducer,
  },
});
