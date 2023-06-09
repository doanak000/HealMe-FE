export const PATH = Object.freeze({
  USER: "/admin-user",
  EVENT: "/admin-event",
  VIDEO: "/admin-video",
  LOGIN: "/login",
  REGISTER: "/register",
  HOME: "/home",
  PROFILE: "/profile",
  DOCTOR: "/doctor/:id",
  PHARMACIST: "/pharmacist",
  PRESCRIPTION: "/prescription",
  PRESCRIPTION_NEW: "/prescription-new",
  PRESCRIPTION_DETAIL: "/prescription/:idPrescription",
  PRICING: '/pricing',
  FORGOT_PASSWORD: '/forgot-password',
  RESET_PASSWORD: '/reset-password/:userId/:token',
  APPOINTMENT:'/appointment',
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
  PRESCRIPTION_DETAIL: PATH.PRESCRIPTION_DETAIL,
});

export const ROLE = Object.freeze({
  ADMIN: "admin",
  AGENCY: "agency",
  CLIENT: "client",
});

export const ROUTES = Object.freeze({
  PRIVATE: [
    { path: PATH.PROFILE, component: "ProfilePage" },
    { path: PATH.PRESCRIPTION, component: "PrescriptionPage", exact: true },
    { path: PATH.PRESCRIPTION_NEW, component: "PrescriptionNewPage" },
    { path: PATH.PRESCRIPTION_DETAIL, component: "PrescriptionDetailPage" },
    { path: PATH.PRICING, component: 'PricingPage' },
    {path:PATH.APPOINTMENT, component: 'AppointmentPage' },
  ],

  PUBLIC: [
    { path: PATH.LOGIN, component: "LoginPage" },
    { path: PATH.REGISTER, component: "RegisterPage" },
    { path: PATH.HOME, component: "HomePage", exact: true },
    { path: PATH.DOCTOR, component: "DoctorDetailPage" },
    { path: PATH.FORGOT_PASSWORD, component: 'ForgotPasswordPage' },
    { path: PATH.RESET_PASSWORD, component: 'ResetPasswordPage' },
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
