import * as yup from "yup";

export const profileValidationSchema = yup.object().shape({
  email: yup.string().required("Email is required!"),
  password: yup
    .string()
    .required("Password is required!")
    .min(6, "Password must have 6-50 characters!")
    .max(50, "Password must have 6-50 characters!"),
  name: yup.string().required("Username is required!"),
  phoneNumber: yup
    .string()
    .required("Phone is required!")
    .matches(/^[0-9]+$/g, "Phone must be a number!"),
});