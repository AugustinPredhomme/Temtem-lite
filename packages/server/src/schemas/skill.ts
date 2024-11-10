import * as yup from 'yup';

export const skillSchema = yup.object().shape({
    id: yup.number(),
    name: yup.string().required("Name required").min(2).max(50),
    damage: yup.number().required("Damage required"),
    cooldown: yup.number().required("Cooldown required")
});