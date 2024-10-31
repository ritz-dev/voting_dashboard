import * as yup from 'yup';
import { imageUrlRegExp, passwordRules } from '@/utils/constants';

export const userValidationSchema = yup.object().shape({
    name: yup.string().required('Name is Required!'),
    email: yup
        .string()
        .email('The provided email address format is not valid')
        .required('You must provide your email address'),
    password: yup
        .string()
        .required('Password is Required!')
        .matches(passwordRules, {
            message: 'Please create a stronger password. Hint: Min 8 characters, 1 Upper case letter, 1 Lower case letter, 1 Numeric digit.',
        }),
    imageUrl: yup
        .object()
        .nullable()
        .shape({
            file_name: yup
                .string()
                .required('File Name is required!')
                .matches(/^[a-zA-Z0-9_.-]*$/, 'File name can only contain letters, numbers, underscores, dashes, and dots.'),
            id: yup
                .number()
                .required('ID is required!')
                .positive('ID must be a positive number.'),
            original: yup
                .string()
                .url('Invalid URL format for original image.')
                .required('Original image URL is required!')
                .matches(imageUrlRegExp, 'Original image URL must end with .jpg, .jpeg, .png, .gif, .bmp, or .webp'),
            thumbnail: yup
                .string()
                .url('Invalid URL format for thumbnail image.')
                .required('Thumbnail image URL is required!')
                .matches(imageUrlRegExp, 'Thumbnail image URL must end with .jpg, .jpeg, .png, .gif, .bmp, or .webp'),
        }),
    role: yup.string().required('Please select a role.'),
    isActive: yup
        .string()
        .required('Status is required'),
});

