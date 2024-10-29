import * as yup from 'yup';

export const eventValidationSchema = yup.object().shape({
    title: yup.string().required('Title Required'),
    candidates: yup.array().of(yup.string()).min(1, 'Permission Required')
})