import * as yup from 'yup';

export const registerSchema = yup.object({
    fullName: yup
        .string()
        .required('Full Name is required')
        .min(3, 'Full Name must be at least 3 characters'),

    userName: yup
        .string()
        .required('Username is required')
        .min(3, 'Username must be at least 3 characters')
        .matches(/^\S+$/, 'Username cannot contain spaces'),

    email: yup
        .string()
        .required('Email is required')
        .email('Invalid email format'),

    password: yup
        .string()
        .required('Password is required')
        .min(6, 'Password must be at least 6 characters')
        .matches(/[A-Z]/, 'Password must contain an uppercase letter')
        .matches(/[a-z]/, 'Password must contain a lowercase letter')
        .matches(/[0-9]/, 'Password must contain a number')
        .matches(/[^A-Za-z0-9]/, 'Password must contain a special character'),

    phoneNumber: yup
        .string()
        .required('Phone Number is required')
        .matches(/^05\d{8}$/, 'Phone must start with 05 and be 10 digits'),
});

export const loginSchema = yup.object({
    email: yup
        .string()
        .required('Email is required')
        .email('Invalid email format'),

    password: yup
        .string()
        .required('Password is required'),
});
export const forgotPasswordSchema = yup.object({
    email: yup
        .string()
        .required('Email is required')
        .email('Invalid email format'),
});

export const resetPasswordSchema = yup.object({
    code: yup
        .string()
        .required('Code is required')
        .matches(/^\d{4}$/, 'Code must be 4 digits'),

    newPassword: yup
        .string()
        .required('Password is required')
        .min(6, 'Password must be at least 6 characters')
        .matches(/[A-Z]/, 'Password must contain an uppercase letter')
        .matches(/[a-z]/, 'Password must contain a lowercase letter')
        .matches(/[0-9]/, 'Password must contain a number')
        .matches(/[^A-Za-z0-9]/, 'Password must contain a special character'),

    confirmNewPassword: yup
        .string()
        .required('Please confirm your password')
        .oneOf([yup.ref('newPassword')], 'Passwords do not match'),
});