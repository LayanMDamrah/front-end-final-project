import { Typography, TextField, Button, Box, Link, IconButton, InputAdornment, Alert } from '@mui/material';
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { Link as RouterLink, useNavigate } from 'react-router';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { loginSchema } from '../validations/authSchemas.js';
import axios from 'axios';

export default function LogIn() {
    const [showPassword, setShowPassword] = useState(false);
    const [serverError, setServerError] = useState('');
    const navigate = useNavigate();

    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({
        resolver: yupResolver(loginSchema),
        mode: 'onBlur',
    });

    const onSubmit = async (data) => {
        setServerError('');
        try {
            const response = await axios.post('https://knowledgeshop.runasp.net/api/auth/Account/LogIn', data);
            console.log('Login success:', response.data);
            navigate('/home');
        } catch (error) {
            console.log('Server says:', JSON.stringify(error.response?.data, null, 2));

            const errs = error.response?.data?.errors;
            const message = errs ? Object.values(errs).flat().join(' ') : '';

            setServerError(message || error.response?.data?.message || 'Something went wrong, try again');
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
            <Box sx={{ flex: 1, p: 2, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Box component="form" noValidate onSubmit={handleSubmit(onSubmit)} sx={{ width: '100%', maxWidth: 600 }}>
                    <Typography sx={{ fontSize: 40, fontWeight: 'bold' }}>Sign In</Typography>
                    <Typography sx={{ fontSize: 20, mb: 5 }}>Welcome back. Enter your workspace credentials to continue.</Typography>

                    {/* EMAIL */}
                    <Typography sx={{ mb: 1, fontWeight: 500 }}>Email</Typography>
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

                    <Link
                        component={RouterLink}
                        to="/resetPassword"
                        sx={{ display: 'block', textAlign: 'right', color: 'var(--primary)', fontWeight: 'bold', mt: 1.5 }}
                    >
                        Forgot password?
                    </Link>

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
                        {isSubmitting ? 'Signing in...' : 'Sign In'}
                    </Button>

                    <Typography sx={{ mt: 3, textAlign: 'center' }}>
                        Don't have an account?{' '}
                        <Link component={RouterLink} to="/register" sx={{ color: 'var(--primary)', fontWeight: 'bold' }}>
                            Create one
                        </Link>
                    </Typography>
                </Box>
            </Box>

        </Box>
    );
}