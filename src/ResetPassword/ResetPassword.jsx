import { Typography, TextField, Button, Box, Link,  Alert } from '@mui/material';
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined';

import { Link as RouterLink, useNavigate } from 'react-router';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { forgotPasswordSchema } from '../validations/authSchemas.js';
import axios from 'axios';

export default function ResetPassword() {
    const [serverError, setServerError] = useState('');
    const navigate = useNavigate();

    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({
        resolver: yupResolver(forgotPasswordSchema),
        mode: 'onBlur',
    });

   const onSubmit = async (data) => {
    setServerError('');
    try {
        const response = await axios.post('https://knowledgeshop.runasp.net/api/auth/Account/SendCode', data);
        console.log('Code sent:', response.data);
        navigate('/code', { state: { email: data.email } });
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
                    <Typography sx={{ fontSize: 40, fontWeight: 'bold' }}>Forgot Your Password?</Typography>
                    <Typography sx={{ fontSize: 20, mb: 5 }}>Enter your email address and we'll send a 4-digit verification
                        code to reset your credentials.</Typography>

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
                        {isSubmitting ? 'Sending Code...' : 'Send Code'}
                    </Button>

                    <Typography sx={{ mt: 3, textAlign: 'center' }}>
                        Remember your password? {' '}
                        <Link component={RouterLink} to="/login" sx={{ color: 'var(--primary)', fontWeight: 'bold' }}>
                            Back to sign in
                        </Link>
                    </Typography>
                </Box>
            </Box>

        </Box>
    );
}