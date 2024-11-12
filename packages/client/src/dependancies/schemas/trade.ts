import * as yup from 'yup';

export const tradeSchema = yup.object().shape({
    user_two: yup.number().required('Please select a user to trade with.'),
    temtem_id: yup.number().required('Please select a Temtem to trade'),
});