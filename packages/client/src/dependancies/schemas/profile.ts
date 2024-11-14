import * as yup from 'yup';

export const profileSchema = yup.object().shape({
    firstName: yup.string(),
    lastName: yup.string(),
    role: yup.string(),
    birthday: yup.date(),
    country: yup.string(),
    phone: yup.string().matches(/^\d{10,15}$/),
});