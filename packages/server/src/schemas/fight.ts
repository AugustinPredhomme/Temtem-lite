import * as yup from 'yup';

export const fightSchema = yup.object().shape({
    id: yup.number(),
    user_one: yup.number().required("User 1 required"),
    user_two: yup.number().required("User 2 required"),
    winner: yup.number().required("Winner required")
});