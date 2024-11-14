import * as yup from 'yup';

export const userSchema = yup.object().shape({
    id: yup.number(),
    username: yup.string().required("Username required").min(3).max(50),
    firstName: yup.string(),
    lastName: yup.string(),
    email: yup.string().email().required("Email required"),
    password: yup.string().min(8, "Password should contain 8 caracters minimum").required("Password required"),
    role: yup.string(),
    birthday: yup.date(),
    country: yup.string(),
    phone: yup.string().matches(/^\d{10,15}$/),
    refresh_token: yup.string()
});