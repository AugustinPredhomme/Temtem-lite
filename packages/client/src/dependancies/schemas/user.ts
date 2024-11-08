import * as yup from 'yup';

export const userSchema = yup.object().shape({
    username: yup.string().required().min(3).max(50),
    firstName: yup.string(),
    lastName: yup.string(),
    email: yup.string().email().required(),
    password: yup.string().min(8).required(),
    role: yup.string(),
    birthday: yup.date(),
    country: yup.string(),
    phone: yup.string().matches(/^\d{10,15}$/), // Basic phone number validation
});