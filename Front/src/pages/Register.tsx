import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Box, Typography, FormControl, Grid, Divider } from '@mui/material';
import mainBack from '../../public/mainBack.png';
import defaultUser from '../../public/defaultUser.jpg';

const Register = () => {
    const navigate = useNavigate();

    const [shopName, setShopName] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [tp, setTp] = useState<string>('');
    const [address, setAddress] = useState<string>('');
    const [location, setLocation] = useState<string>('');
    const [photo, setPhoto] = useState<any>(null);
    const [photoBox, setPhotoBox] = useState<any>(defaultUser);
    const [town, setTown] = useState<string>('');

    const onSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('name', shopName);
        formData.append('password', password);
        formData.append('email', email);
        formData.append('tp', tp);
        formData.append('address', address);
        formData.append('location', location);
        formData.append('town', town);
        if (photo) {
            formData.append('photo', photo);
        }

        fetch('http://localhost:5000/api/auth/addUser', {
            method: 'POST',
            body: formData,
        })
            .then((response) => response.json())
            .then((data) => {
                navigate('/login');
            })
            .catch((error) => console.error('Error registering:', error));
    };

    const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setPhoto(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setPhotoBox(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <Box
            sx={{
                display: 'flex',
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
                    // width: '50vw',
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
                <Typography variant="h2" component="h1" gutterBottom fontWeight="bold">
                    Register
                </Typography>
                <Grid container spacing={3}>
                    <Grid
                        item
                        xs={12}
                        md={6}
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <FormControl fullWidth sx={{ display: 'flex', alignItems: 'center' }}>
                            <Button variant="contained" component="label" sx={{ mt: 3 }}>
                                Upload Photo
                                <input type="file" id="photo" hidden accept="image/*" onChange={handlePhotoChange} />
                            </Button>
                            {photoBox && (
                                <Box
                                    mt={2}
                                    sx={{
                                        width: '100%',
                                        display: 'flex',
                                        justifyContent: 'center',
                                    }}
                                >
                                    <img src={photoBox} alt="Selected" style={{ maxWidth: '100%', height: 'auto' }} />
                                </Box>
                            )}
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} md={6}>
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
                            <TextField
                                label="Email"
                                type="email"
                                variant="outlined"
                                fullWidth
                                margin="normal"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                sx={{ backgroundColor: 'white', borderRadius: '5px' }}
                            />
                            <TextField
                                label="Telephone Number"
                                type="text"
                                variant="outlined"
                                fullWidth
                                margin="normal"
                                value={tp}
                                onChange={(e) => setTp(e.target.value)}
                                required
                                sx={{ backgroundColor: 'white', borderRadius: '5px' }}
                            />
                            <TextField
                                label="Town"
                                type="text"
                                variant="outlined"
                                fullWidth
                                margin="normal"
                                value={town}
                                onChange={(e) => setTown(e.target.value)}
                                required
                                sx={{ backgroundColor: 'white', borderRadius: '5px' }}
                            />
                            <TextField
                                label="Address"
                                type="text"
                                variant="outlined"
                                fullWidth
                                margin="normal"
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                                sx={{ backgroundColor: 'white', borderRadius: '5px' }}
                            />
                            <TextField
                                label="Location"
                                type="text"
                                variant="outlined"
                                fullWidth
                                margin="normal"
                                value={location}
                                onChange={(e) => setLocation(e.target.value)}
                                sx={{ backgroundColor: 'white', borderRadius: '5px' }}
                            />
                        </Box>
                    </Grid>
                </Grid>
                <Button type="submit" variant="contained" color="primary" sx={{ mt: 3 }}>
                    Register
                </Button>
            </Box>
        </Box>
    );
};

export default Register;
