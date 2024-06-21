import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Box, Typography, Link } from '@mui/material';
import mainBack from '../../public/mainBack.png';

const Login: React.FC = () => {
    const navigate = useNavigate();
    const [shopName, setShopName] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [error, setError] = useState<string | null>('');

    const onSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        fetch('http://localhost:5000/api/auth/checkUser', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ userName: shopName, password: password }),
        })
            .then((response) => response.json())
            .then((data) => {
                if (data.result) {
                    setError(null);
                    navigate('/seller', { state: { userId: data.userId } });
                } else {
                    setError('Invalid User Name or Password');
                }
            })
            .catch((error) => console.error('Error logging in:', error));
    };

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                height: '100vh',
                width: '100vw',
                backgroundImage: `url(${mainBack})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
            }}
        >
            <Box
                sx={{
                    height: '34vh',
                    width: '23vw',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    border: '5px solid black',
                    backgroundColor: 'rgba(222, 252, 254, 0.5)',
                    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2), 0 6px 20px rgba(0, 0, 0, 0.19)',
                    borderRadius: '10px',
                    padding: '20px',
                }}
            >
                <Typography variant="h4" component="h1" gutterBottom>
                    Login
                </Typography>
                <Box component="form" onSubmit={onSubmit} sx={{ width: '100%', maxWidth: 400 }}>
                    <TextField
                        label="Shop Name"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        value={shopName}
                        onChange={(e) => setShopName(e.target.value)}
                        required
                        sx={{ backgroundColor: 'white', borderRadius: '5px' }}
                    />
                    <TextField
                        label="Password"
                        type="password"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        sx={{ backgroundColor: 'white', borderRadius: '5px' }}
                    />
                    {error && (
                        <Typography
                            color="error"
                            sx={{
                                justifyContent: 'center',
                                display: 'flex',
                                alignItems: 'center',
                            }}
                        >
                            {error}
                        </Typography>
                    )}
                    <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
                        Login
                    </Button>
                </Box>
                <Link href="/register" sx={{ mt: 2 }}>
                    Register
                </Link>
            </Box>
        </Box>
    );
};

export default Login;
