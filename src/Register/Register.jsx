import { Typography, TextField, Button, Box, Link, IconButton, InputAdornment, Alert } from '@mui/material';
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { Link as RouterLink, useNavigate } from 'react-router';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { registerSchema } from '../validations/authSchemas.js';
import axios from 'axios';

export default function Register() {
    const [showPassword, setShowPassword] = useState(false);
    const [serverError, setServerError] = useState('');
    const navigate = useNavigate();

    const { register, handleSubmit, setError, formState: { errors, isSubmitting } } = useForm({
        resolver: yupResolver(registerSchema),
        mode: 'onBlur',
    });

    const onSubmit = async (data) => {
        setServerError('');
        try {
            await axios.post('https://knowledgeshop.runasp.net/api/auth/Account/Register', data);
            navigate('/login');
        } catch (error) {
            const message = error.response?.data?.errors?.join(' ') || '';

            if (message.includes('Username')) {
                setError('userName', { message: 'Username is already taken' });
            }

            if (message.includes('Email')) {
                setError('email', { message: 'Email is already taken' });
            }

            if (message.includes('Password')) {
                setError('password', { message: message });
            }

            if (message.includes('Phone')) {
                setError('phoneNumber', { message: 'Invalid phone number' });
            }

            if (message === '') {
                setServerError(error.response?.data?.message || 'Something went wrong, try again');
            }
        }
    };

    const inputSx = { '& .MuiOutlinedInput-root': { bgcolor: '#EAF3FD', borderRadius: 2 }, '& fieldset': { border: 'none' } };

    return (
        <Box sx={{ display: 'flex', minHeight: '100vh' }}>

            {/* left */}
            <Box sx={{ flex: 1, p: 2, background: 'linear-gradient(135deg, var(--primary), var(--secondry))' }}>

                {/* logo */}
                <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                    <Box sx={{ width: 60, height: 60, borderRadius: '50%', border: '6px solid white', display: 'flex', alignItems: 'center', justifyContent: 'center', bgcolor: 'var(--primary)' }}>
                        <ShoppingBagOutlinedIcon sx={{ fontSize: 40, color: 'white' }} />
                    </Box>
                    <Typography sx={{ color: 'white', fontWeight: 'bold', fontSize: 25 }}>KaShop</Typography>
                </Box>

                {/* text */}
                <Box sx={{ mt: 25, mx: 4 }}>
                    <Typography sx={{ color: 'white', fontSize: 28, fontWeight: 'bold' }}>
                        Everything you love, in one place
                    </Typography>
                    <Typography sx={{ color: 'white', fontSize: 20, mt: 2 }}>
                        Your curated storefront for everyday essentials.
                    </Typography>
                </Box>
            </Box>

            {/* right */}
            <Box sx={{ flex: 1, pt: 5, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Box component="form" noValidate onSubmit={handleSubmit(onSubmit)} sx={{ width: '100%', maxWidth: 600 }}>
                    <Typography sx={{ fontSize: 40, fontWeight: 'bold' }}>Create an account</Typography>
                    <Typography sx={{ fontSize: 20, mb: 5 }}>Join KaShop to unlock premier merchant pricing.</Typography>

                    {/* FULL NAME */}
                    <Typography sx={{ mb: 1, fontWeight: 500 }}>Full Name</Typography>
                    <TextField
                        fullWidth
                        placeholder="Layan Ahmad"
                        {...register('fullName')}
                        error={!!errors.fullName}
                        sx={inputSx}
                    />
                    {errors.fullName && (
                        <Typography sx={{ color: 'red', fontSize: 14, mt: 0.5 }}>
                            {errors.fullName.message}
                        </Typography>
                    )}

                    {/* USERNAME */}
                    <Typography sx={{ mb: 1, mt: 3, fontWeight: 500 }}>Username</Typography>
                    <TextField
                        fullWidth
                        placeholder="Enter your username"
                        {...register('userName')}
                        error={!!errors.userName}
                        sx={inputSx}
                    />
                    {errors.userName && (
                        <Typography sx={{ color: 'red', fontSize: 14, mt: 0.5 }}>
                            {errors.userName.message}
                        </Typography>
                    )}

                    {/* EMAIL */}
                    <Typography sx={{ mb: 1, mt: 3, fontWeight: 500 }}>Email</Typography>
                    <TextField
                        fullWidth
                        type="email"
                        placeholder="layan@gmail.com"
                        {...register('email')}
                        error={!!errors.email}
                        sx={inputSx}
                    />
                    {errors.email && (
                        <Typography sx={{ color: 'red', fontSize: 14, mt: 0.5 }}>
                            {errors.email.message}
                        </Typography>
                    )}

                    {/* PHONE */}
                    <Typography sx={{ mb: 1, mt: 3, fontWeight: 500 }}>Phone Number</Typography>
                    <TextField
                        fullWidth
                        type="tel"
                        placeholder="05XXXXXXXX"
                        {...register('phoneNumber')}
                        error={!!errors.phoneNumber}
                        sx={inputSx}
                    />
                    {errors.phoneNumber && (
                        <Typography sx={{ color: 'red', fontSize: 14, mt: 0.5 }}>
                            {errors.phoneNumber.message}
                        </Typography>
                    )}

                    {/* PASSWORD */}
                    <Typography sx={{ mb: 1, mt: 3, fontWeight: 500 }}>Password</Typography>
                    <TextField
                        fullWidth
                        type={showPassword ? 'text' : 'password'}
                        placeholder="••••••••"
                        {...register('password')}
                        error={!!errors.password}
                        sx={inputSx}
                        slotProps={{
                            input: {
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                                            {showPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            },
                        }}
                    />
                    {errors.password && (
                        <Typography sx={{ color: 'red', fontSize: 14, mt: 0.5 }}>
                            {errors.password.message}
                        </Typography>
                    )}

                    {/* SERVER ERROR */}
                    {serverError && (
                        <Alert severity="error" sx={{ mt: 3 }}>
                            {serverError}
                        </Alert>
                    )}

                    {/* BUTTON */}
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        disabled={isSubmitting}
                        sx={{ mt: 4, py: 1.5, borderRadius: 2, bgcolor: 'var(--primary)', textTransform: 'none', fontWeight: 'bold' }}
                    >
                        {isSubmitting ? 'Creating...' : 'Create account'}
                    </Button>

                    <Typography sx={{ mt: 3, textAlign: 'center' }}>
                        Already have an account?{' '}
                        <Link component={RouterLink} to="/login" sx={{ color: 'var(--primary)', fontWeight: 'bold' }}>
                            Sign In
                        </Link>
                    </Typography>
                </Box>
            </Box>

        </Box>
    );
}