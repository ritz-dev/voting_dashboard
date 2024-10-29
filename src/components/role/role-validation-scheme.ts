import * as yup from 'yup';

export const roleValidationSchema = yup.object().shape({
    name: yup.string().required('Name Required'),
    permissions: yup.array().of(yup.string()).min(1, 'Permission Required')
})