import React, { useEffect, useState } from 'react';
import { Box, Typography, Button, FormControl, InputLabel, OutlinedInput, IconButton, InputAdornment } from '@mui/material';

//assets
import logo from '../../assets/images/logo.png';
import { Link, useSearchParams } from 'react-router-dom';
import authApi from '../../api/auth';
import Loader from '../../components/shared/Loader/Loader';
import { Check, Visibility, VisibilityOff } from '@mui/icons-material';

const SetNewPassword = () => {

    const [search] = useSearchParams();
    const [loading, setLoading] = useState(true);
    const [token, setToken] = useState({ token: search.get('token'), success: false, error: '', });
    const [showPassword, setShowPassword] = useState(false);
    const [updateStatus, setUpdateStatus] = useState({ success: false, error: false });
    const [changePwd, setChangePwd] = useState({
        password: "",
        confirmPassword: "",
    });
    const [passwordRequirements, setPasswordRequirements] = useState({
        uppercase: false,
        specialChar: false,
        number: false,
        length: false,
        match: false,
    });

    const passwordUpdateHandler = async (e) => {
        if (Object.values(passwordRequirements).includes(false)) {
            return;
        }
        e.target.disabled = true;
        setUpdateStatus({ success: false, error: false });
        try {
            await authApi.updatePassword({ token: token.token, password: changePwd.password });
            setChangePwd({ password: '', confirmPassword: '' });
            setUpdateStatus({ success: true, error: false });
        } catch (err) {
            setUpdateStatus({ success: false, error: err?.response?.data?.message });
        } finally {
            e.target.disabled = false;
        }
    }

    // verify token
    useEffect(() => {
        (async () => {
            try {
                await authApi.resetTokenVerify({ token: token.token });
                setToken({ ...token, success: true, error: '' });
            } catch (err) {
                setToken({ ...token, error: err?.response?.data?.message, success: false });
            } finally {
                setLoading(false);
            }
        })();
    }, []);

    useEffect(() => {
        const newRequirements = {
            uppercase: /^(?=.*[A-Z])/.test(changePwd.password),
            specialChar: /^(?=.*[~`!@#$%^&*()--+={}\[\]|\\:;"'<>,.?/_₹]).*$/.test(changePwd.password),
            number: /^(?=.*[0-9]).*$/.test(changePwd.password),
            length: changePwd.password.length >= 8,
            match: changePwd.password.length > 0 && changePwd.password === changePwd.confirmPassword
        };
        setPasswordRequirements(newRequirements);
    }, [changePwd]);

    if (loading) {
        return <Loader />
    }

    if (!token.success) {
        return <div className='w-full h-screen grid place-items-center'>
            <div className='shadow-lg border-2 py-10 px-5 rounded-lg'>
                <h3 className='text-center text-lg text-red-500 font-medium'>{token.error}</h3>
            </div>
        </div>
    }

    return (
        <Box
            sx={{
                width: '100%',
                height: '100vh',
                display: 'grid',
                placeItems: 'center'
            }}
        >
            <Box className='w-[500px] rounded-lg shadow-lg px-5 pt-5 pb-10 border-2 border-[#f2f2f2]'>
                {updateStatus.success ?
                    <h3 className='text-center text-green-400 font-medium'>Password was updated successfully. go to <Link to='/' className='underline'>login</Link></h3>
                    :
                    <Box className='flex flex-col gap-y-3 w-full'>
                        <a rel='noreferrer' href='https://www.ingelt.com' target='_blank' className='w-28 mx-auto'><img src={logo} alt='InGelt Logo' className='w-full h-auto' /></a>
                        <Typography variant="h6" component="h2" mb={2}>
                            Set New Password
                        </Typography>
                        <FormControl className='mb-2' size='small' variant="outlined">
                            <InputLabel className='!text-sm' htmlFor="outlined-adornment-password">New Password</InputLabel>
                            <OutlinedInput
                                id="outlined-adornment-password"
                                type={showPassword ? 'text' : 'password'}
                                onChange={(e) => setChangePwd({ ...changePwd, password: e.target.value })}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={(e) => setShowPassword(!showPassword)}
                                            onMouseDown={(e) => setShowPassword(!showPassword)}
                                            edge="end"
                                        >
                                            {showPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                }
                                label="New Password"
                                className='!text-sm'
                                value={changePwd.password}
                            />
                        </FormControl>
                        <FormControl size='small' variant="outlined">
                            <InputLabel className='!text-sm' htmlFor="outlined-adornment-password">Confirm Password</InputLabel>
                            <OutlinedInput
                                id="outlined-adornment-password"
                                type={showPassword ? 'text' : 'password'}
                                onChange={(e) => setChangePwd({ ...changePwd, confirmPassword: e.target.value })}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={() => setShowPassword(!showPassword)}
                                            onMouseDown={() => setShowPassword(!showPassword)}
                                            edge="end"
                                        >
                                            {showPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                }
                                label="Confirm Password"
                                className='!text-sm'
                                value={changePwd.confirmPassword}
                            />
                        </FormControl>
                        <div className="text-xs mt-2 bg-[#1b3c7d1f] pb-3 pt-2 rounded-lg pl-3">
                            <div className="flex items-left mt-0.5">
                                <Check
                                    className={`${passwordRequirements.uppercase ? "text-green-500" : ""
                                        } `}
                                    sx={{
                                        visibility: passwordRequirements.uppercase
                                            ? "visible"
                                            : "hidden",
                                    }}
                                />
                                <p className="ml-2 pt-1">
                                    Contains at least one uppercase letter
                                </p>
                            </div>
                            <div className="flex items-left mt-0.5">
                                <Check
                                    className={`${passwordRequirements.specialChar ? "text-green-500" : ""
                                        }`}
                                    sx={{
                                        visibility: passwordRequirements.specialChar
                                            ? "visible"
                                            : "hidden",
                                    }}
                                />
                                <p className="ml-2 pt-1">
                                    Contains at least one special character
                                </p>
                            </div>
                            <div className="flex items-left mt-0.5">
                                <Check
                                    className={`${passwordRequirements.number ? "text-green-500" : ""
                                        }`}
                                    sx={{
                                        visibility: passwordRequirements.number
                                            ? "visible"
                                            : "hidden",
                                    }}
                                />
                                <p className="ml-2 pt-1">Contains at least one number</p>
                            </div>
                            <div className="flex items-left mt-0.5">
                                <Check
                                    className={`${passwordRequirements.length ? "text-green-500" : ""
                                        }`}
                                    sx={{
                                        visibility: passwordRequirements.length
                                            ? "visible"
                                            : "hidden",
                                    }}
                                />
                                <p className="ml-2 pt-1">
                                    Password length is at least 8 characters
                                </p>
                            </div>
                            <div className="flex items-left mt-0.5">
                                <Check
                                    className={`${passwordRequirements.match ? "text-green-500" : ""}`}
                                    sx={{
                                        visibility: passwordRequirements.match ? "visible" : "hidden",
                                    }}
                                />
                                <p className="ml-2 pt-1">
                                    Password matches
                                </p>
                            </div>
                        </div>
                        {updateStatus.error && <p className='text-center text-red-500 text-sm'>{updateStatus.error}</p>}
                        <Box mt={1}>
                            <Button
                                variant="contained"
                                color="primary"
                                fullWidth
                                sx={{
                                    padding: '0.7rem 0rem',
                                    backgroundColor: '#0C3C82',
                                    '&:hover': {
                                        backgroundColor: '#0C3C82'
                                    }
                                }}
                                disabled={Object.values(passwordRequirements).includes(false)}
                                onClick={passwordUpdateHandler}
                            >
                                Set Password
                            </Button>
                        </Box>
                    </Box>
                }
            </Box>
        </Box>
    );
}

export default SetNewPassword;
