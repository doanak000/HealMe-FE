export const PATH = Object.freeze({
  USER: "/admin-user",
  EVENT: "/admin-event",
  VIDEO: "/admin-video",
  LOGIN: "/login",
  REGISTER: "/register",
  HOME: "/home",
  PROFILE: "/home/profile",
  DOCTOR: "/home/doctor/:id",
  PHARMACIST: "/pharmacist",
  PRESCRIPTION: "/home/prescription",
  PRESCRIPTION_NEW: "/home/prescription-new",
});

export const SIDEBAR = Object.freeze({
  USER: PATH.USER,
  EVENT: PATH.EVENT,
  VIDEO: PATH.VIDEO,
  LOGOUT: "logout",
  PROFILE: PATH.PROFILE,
  DOCTOR: PATH.DOCTOR,
  PHARMACIST: PATH.PHARMACIST,
  PRESCRIPTION: PATH.PRESCRIPTION,
  PRESCRIPTION_NEW: PATH.PRESCRIPTION_NEW,
});

export const ROLE = Object.freeze({
  ADMIN: "admin",
  AGENCY: "agency",
  CLIENT: "client",
});

export const ROUTES = Object.freeze({
  PRIVATE: [],

  PUBLIC: [
    { path: PATH.LOGIN, component: "LoginPage" },
    { path: PATH.REGISTER, component: "RegisterPage" },
    { path: PATH.HOME, component: "HomePage", exact: true },
    { path: PATH.PROFILE, component: "ProfilePage" },
    { path: PATH.DOCTOR, component: "DoctorDetailPage" },
    { path: PATH.PRESCRIPTION, component: "PrescriptionPage" },
    { path: PATH.PRESCRIPTION_NEW, component: "PrescriptionNewPage" },
  ],
});

export const NOTIFICATION_TYPE = Object.freeze({
  SUCCESS: "success",
  ERROR: "error",
  WARNING: "warning",
  INFO: "info",
});

export const COLUMN_TYPE = Object.freeze({
  TEXT: "text",
  DATE: "date",
  DATE_STRING: "dateString",
  NUMBER: "number",
  LINK: "link",
});

export const CREATE_UPDATE_DELETE_STATUS = Object.freeze({
  UPCOMING: "upcoming",
  SUCCESS: "success",
  ERROR: "error",
});
