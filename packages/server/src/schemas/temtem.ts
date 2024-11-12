import * as yup from 'yup';

export const temtemSchema = yup.object().shape({
    id: yup.number(),
    name: yup.string().required("Name required").min(2).max(50),
    health: yup.number().required("Health required").min(20),
    type_one: yup.string().required("Type one required").min(3).max(50)
});