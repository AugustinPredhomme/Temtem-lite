import * as yup from 'yup';

export const inventorySchema = yup.object().shape({
    id: yup.number(),
    user_id: yup.number().required("User ID required")
});
