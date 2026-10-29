import { Typography, TextField, Button, Box, Link, Alert, IconButton, InputAdornment } from '@mui/material';
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined';
import LockResetIcon from '@mui/icons-material/LockReset';
import CheckBoxOutlinedIcon from '@mui/icons-material/CheckBoxOutlined';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Link as RouterLink, useNavigate, useLocation } from 'react-router';
import { useState, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { resetPasswordSchema } from '../validations/authSchemas.js';
import axios from 'axios';

export default function Code() {
    const [serverError, setServerError] = useState('');
    const [resendMessage, setResendMessage] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);
    const [otp, setOtp] = useState(['', '', '', '']);
    const inputsRef = useRef([]);

    const navigate = useNavigate();
    const location = useLocation();
    const email = location.state?.email;

    const { register, handleSubmit, setValue, formState: { errors, isSubmitting } } = useForm({
        resolver: yupResolver(resetPasswordSchema),
        mode: 'onBlur',
    });

    // OTP
    const handleOtpChange = (index, value) => {
        if (!/^\d?$/.test(value)) return;

        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);
        setValue('code', newOtp.join(''), { shouldValidate: true });

        if (value && index < 3) {
            inputsRef.current[index + 1].focus();
        }
    };

    const handleOtpKeyDown = (index, e) => {
        if (e.key === 'Backspace' && !otp[index] && index > 0) {
            inputsRef.current[index - 1].focus();
        }
    };

    const otpComplete = otp.join('').length === 4;

    // RESEND
    const handleResend = async () => {
        setServerError('');
        setResendMessage('');
        try {
            await axios.post('https://knowledgeshop.runasp.net/api/auth/Account/SendCode', { email });
            setResendMessage('A new code was sent to your email');
        } catch (error) {
            setServerError(error.response?.data?.message || 'Could not resend code');
        }
    };

    // SUBMIT
    const onSubmit = async (data) => {
        setServerError('');
        try {
            const response = await axios.patch('https://knowledgeshop.runasp.net/api/auth/Account/ResetPassword', {
                email: email,
                code: data.code,
                newPassword: data.newPassword,
            });
            console.log('Reset success:', response.data);
            navigate('/login');
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
                <Box component="form" noValidate onSubmit={handleSubmit(onSubmit)} sx={{ width: '100%', maxWidth: 500 }}>
                    <Typography sx={{ fontSize: 40, fontWeight: 'bold', color: 'var(--head-color)' }}>
                        Reset Your Password
                    </Typography>
                    <Typography sx={{ fontSize: 18, mb: 4, color: 'var(--span)' }}>
                        Enter the verification code sent to{' '}
                        <Box component="span" sx={{ color: 'var(--head-color)', fontWeight: 500 }}>
                            {email || 'your email'}
                        </Box>{' '}
                        and establish a strong new password.
                    </Typography>

                    {/* OTP */}
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1.5 }}>
                        <Typography sx={{ fontSize: 18, fontWeight: 500 }}>Verification Code (OTP)</Typography>
                        <Typography sx={{ fontSize: 13, color: 'var(--span)' }}>4-Digit Code</Typography>
                    </Box>

                    <input type="hidden" {...register('code')} />

                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        {[0, 1, 2, 3].map((index) => (
                            <TextField
                                key={index}
                                value={otp[index]}
                                onChange={(e) => handleOtpChange(index, e.target.value)}
                                onKeyDown={(e) => handleOtpKeyDown(index, e)}
                                inputRef={(el) => (inputsRef.current[index] = el)}
                                slotProps={{
                                    htmlInput: {
                                        maxLength: 1,
                                        inputMode: 'numeric',
                                        style: { textAlign: 'center', fontSize: 26, fontWeight: 'bold' },
                                    },
                                }}
                                sx={{
                                    width: 70,
                                    '& .MuiOutlinedInput-root': { bgcolor: '#EAF3FD', borderRadius: 2, height: 70 },
                                    '& fieldset': { border: 'none' },
                                    '& .Mui-focused fieldset': { border: '2px solid var(--primary)' },
                                }}
                            />
                        ))}
                    </Box>
                    {errors.code && (
                        <Typography sx={{ color: 'red', fontSize: 14, mt: 0.5 }}>
                            {errors.code.message}
                        </Typography>
                    )}

                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 1 }}>
                        <Typography sx={{ fontSize: 14, color: 'var(--span)' }}>
                            Didn't receive code?{' '}
                            <Link
                                component="button"
                                type="button"
                                onClick={handleResend}
                                underline="none"
                                sx={{ color: 'var(--primary)', fontWeight: 'bold', fontSize: 14, verticalAlign: 'baseline' }}
                            >
                                Resend Code
                            </Link>
                        </Typography>
                        {otpComplete && (
                            <Typography sx={{ fontSize: 14, color: 'var(--primary)' }}>Ready to send</Typography>
                        )}
                    </Box>
                    {resendMessage && (
                        <Typography sx={{ color: 'var(--primary)', fontSize: 14, mt: 0.5 }}>{resendMessage}</Typography>
                    )}

                    {/* NEW PASSWORD */}
                    <Typography sx={{ mb: 1, mt: 3, fontSize: 18, fontWeight: 500 }}>New Password</Typography>
                    <TextField
                        fullWidth
                        type={showPassword ? 'text' : 'password'}
                        placeholder="••••••••••••"
                        {...register('newPassword')}
                        error={!!errors.newPassword}
                        sx={inputSx}
                        slotProps={{
                            input: {
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <LockResetIcon sx={{ color: 'var(--neutral)' }} />
                                    </InputAdornment>
                                ),
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                                            {showPassword ? <VisibilityOffOutlinedIcon /> : <VisibilityOutlinedIcon />}
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            },
                        }}
                    />
                    {errors.newPassword && (
                        <Typography sx={{ color: 'red', fontSize: 14, mt: 0.5 }}>
                            {errors.newPassword.message}
                        </Typography>
                    )}

                    {/* CONFIRM PASSWORD */}
                    <Typography sx={{ mb: 1, mt: 3, fontSize: 18, fontWeight: 500 }}>Confirm New Password</Typography>
                    <TextField
                        fullWidth
                        type={showConfirm ? 'text' : 'password'}
                        placeholder="••••••••••••"
                        {...register('confirmNewPassword')}
                        error={!!errors.confirmNewPassword}
                        sx={inputSx}
                        slotProps={{
                            input: {
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <CheckBoxOutlinedIcon sx={{ color: 'var(--neutral)' }} />
                                    </InputAdornment>
                                ),
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton onClick={() => setShowConfirm(!showConfirm)} edge="end">
                                            {showConfirm ? <VisibilityOffOutlinedIcon /> : <VisibilityOutlinedIcon />}
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            },
                        }}
                    />
                    {errors.confirmNewPassword && (
                        <Typography sx={{ color: 'red', fontSize: 14, mt: 0.5 }}>
                            {errors.confirmNewPassword.message}
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
                        endIcon={<LockOutlinedIcon />}
                        sx={{ mt: 3, py: 1.8, borderRadius: 2, bgcolor: 'var(--primary)', textTransform: 'none', fontWeight: 'bold', fontSize: 16 }}
                    >
                        {isSubmitting ? 'Resetting...' : 'Reset Password'}
                    </Button>

                    {/* BACK */}
                    <Link
                        component={RouterLink}
                        to="/login"
                        underline="none"
                        sx={{ mt: 3, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 0.5, color: 'var(--primary)', fontWeight: 500 }}
                    >
                        <ArrowBackIcon fontSize="small" />
                        Back to sign in
                    </Link>
                </Box>
            </Box>

        </Box>
    );
}