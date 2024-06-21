import React, { useState, useEffect } from 'react';
import {
    Container,
    Typography,
    Box,
    Avatar,
    List,
    ListItem,
    ListItemText,
    Divider,
    Button,
    TextField,
    Grid,
    InputAdornment,
    IconButton,
    Link,
} from '@mui/material';
import { useLocation } from 'react-router-dom';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import NavBar from '../components/NavBar';

const Profile = () => {
    const location = useLocation();
    const { user } = location.state;
    const [shop, setShop] = useState(user);
    const [isEditing, setIsEditing] = useState(false);
    const [imageURL, setImageURL] = useState<string | undefined>();
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [showPassword, setShowPassword] = useState<boolean>(false);

    useEffect(() => {
        if (shop.picture && shop.picture.data) {
            const blob = new Blob([new Uint8Array(shop.picture.data)], {
                type: shop.picture.type,
            });
            const url = URL.createObjectURL(blob);
            setImageURL(url);
            return () => URL.revokeObjectURL(url); // Cleanup
        } else {
            console.error('Invalid image prop. Expected an object with type and data properties.');
        }
    }, [shop.picture]);

    const handleEditClick = () => {
        setIsEditing(true);
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const handleCancelClick = () => {
        setIsEditing(false);
        setSelectedFile(null);
        if (shop.picture && shop.picture.data) {
            const blob = new Blob([new Uint8Array(shop.picture.data)], {
                type: shop.picture.type,
            });
            const url = URL.createObjectURL(blob);
            setImageURL(url);
        }
    };

    const handleSaveClick = () => {
        const formData = new FormData();
        formData.append('id', shop.id);
        formData.append('name', shop.name);
        formData.append('email', shop.email);
        formData.append('tp', shop.tp);
        formData.append('address', shop.address);
        formData.append('location', shop.location);
        formData.append('password', shop.password);
        formData.append('town', shop.town);
        if (selectedFile) {
            formData.append('photo', selectedFile);
        }

        fetch('http://localhost:5000/api/auth/updateUser', {
            method: 'POST',
            body: formData,
        })
            .then((response) => response.json())
            .then((data) => {
                setIsEditing(false);
                if (selectedFile && data.picture) {
                    const blob = new Blob([new Uint8Array(data.picture.data)], {
                        type: data.picture.type,
                    });
                    const url = URL.createObjectURL(blob);
                    setImageURL(url);
                }
            })
            .catch((error) => console.error('Error updating:', error));
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target;
        setShop({ ...shop, [id]: value });
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setSelectedFile(file);
            const url = URL.createObjectURL(file);
            setImageURL(url);
        }
    };

    const handleLinkClick = (event: { preventDefault: () => void }) => {
        event.preventDefault();
        window.open(shop.location, '_blank');
    };

    return (
        <Box sx={{ height: '100vh', width: '100vw', backgroundColor: '#f5f5f5' }}>
            <NavBar user={user} />
            <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" sx={{ width: '99vw', height: '90vh', p: 1 }}>
                <Box justifyContent="center" minWidth="30vw" minHeight="70vh" sx={{ backgroundColor: 'white', borderRadius: 2, boxShadow: 3 }}>
                    <Box display="flex" flexDirection="column" alignItems="center" sx={{ p: 2 }}>
                        <Avatar alt={shop.name} src={imageURL} sx={{ width: 120, height: 120, mb: 3 }} />
                        {isEditing ? (
                            <>
                                <Button variant="contained" color="primary" component="label" sx={{ mb: 3 }}>
                                    Change Profile Picture
                                    <input type="file" hidden onChange={handleFileChange} />
                                </Button>
                                <TextField
                                    id="name"
                                    label="Shop Name"
                                    value={shop.name}
                                    onChange={handleChange}
                                    margin="normal"
                                    fullWidth
                                    variant="outlined"
                                />
                                <TextField
                                    id="password"
                                    label="Password"
                                    type={showPassword ? 'text' : 'password'}
                                    value={shop.password}
                                    onChange={handleChange}
                                    margin="normal"
                                    fullWidth
                                    variant="outlined"
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <IconButton onClick={togglePasswordVisibility} edge="end">
                                                    {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                                                </IconButton>
                                            </InputAdornment>
                                        ),
                                    }}
                                />
                                <TextField
                                    id="email"
                                    label="Email"
                                    value={shop.email}
                                    onChange={handleChange}
                                    margin="normal"
                                    fullWidth
                                    variant="outlined"
                                />
                                <TextField
                                    id="tp"
                                    label="Telephone"
                                    value={shop.tp}
                                    onChange={handleChange}
                                    margin="normal"
                                    fullWidth
                                    variant="outlined"
                                />
                                <TextField
                                    id="town"
                                    label="Town"
                                    value={shop.town}
                                    onChange={handleChange}
                                    margin="normal"
                                    fullWidth
                                    variant="outlined"
                                />
                                <TextField
                                    id="address"
                                    label="Address"
                                    value={shop.address}
                                    onChange={handleChange}
                                    margin="normal"
                                    fullWidth
                                    variant="outlined"
                                />
                                <TextField
                                    id="location"
                                    label="Location"
                                    value={shop.location}
                                    onChange={handleChange}
                                    margin="normal"
                                    fullWidth
                                    variant="outlined"
                                />
                                <Box display="flex" justifyContent="space-between" width="100%" mt={2}>
                                    <Button variant="contained" color="primary" onClick={handleSaveClick}>
                                        Save
                                    </Button>
                                    <Button variant="outlined" color="secondary" onClick={handleCancelClick}>
                                        Cancel
                                    </Button>
                                </Box>
                            </>
                        ) : (
                            <>
                                <Typography variant="h4" component="h1" gutterBottom fontWeight="bold">
                                    {shop.name}
                                </Typography>
                                <List sx={{ width: '100%' }}>
                                    <ListItem>
                                        <ListItemText
                                            primary={
                                                <Typography variant="subtitle1" fontWeight="bold">
                                                    Password
                                                </Typography>
                                            }
                                            secondary={
                                                <TextField
                                                    type={showPassword ? 'text' : 'password'}
                                                    value={shop.password}
                                                    disabled
                                                    fullWidth
                                                    variant="standard"
                                                    InputProps={{
                                                        endAdornment: (
                                                            <InputAdornment position="end">
                                                                <IconButton onClick={togglePasswordVisibility} edge="end">
                                                                    {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                                                                </IconButton>
                                                            </InputAdornment>
                                                        ),
                                                    }}
                                                />
                                            }
                                        />
                                    </ListItem>
                                    <Divider />
                                    <ListItem>
                                        <ListItemText
                                            primary={
                                                <Typography variant="subtitle1" fontWeight="bold">
                                                    Email
                                                </Typography>
                                            }
                                            secondary={shop.email}
                                        />
                                    </ListItem>
                                    <Divider />
                                    <ListItem>
                                        <ListItemText
                                            primary={
                                                <Typography variant="subtitle1" fontWeight="bold">
                                                    Telephone
                                                </Typography>
                                            }
                                            secondary={shop.tp}
                                        />
                                    </ListItem>
                                    <Divider />
                                    <ListItem>
                                        <ListItemText
                                            primary={
                                                <Typography variant="subtitle1" fontWeight="bold">
                                                    Town
                                                </Typography>
                                            }
                                            secondary={shop.town}
                                        />
                                    </ListItem>
                                    <Divider />
                                    <ListItem>
                                        <Grid container justifyContent="space-between">
                                            <Grid item>
                                                <ListItemText
                                                    primary={
                                                        <Typography variant="subtitle1" fontWeight="bold">
                                                            Address
                                                        </Typography>
                                                    }
                                                    secondary={shop.address}
                                                />
                                            </Grid>
                                            <Grid item>
                                                <Link href="#" onClick={handleLinkClick}>
                                                    <LocationOnIcon color="primary" />
                                                </Link>
                                            </Grid>
                                        </Grid>
                                    </ListItem>
                                </List>
                                <Button variant="contained" color="primary" onClick={handleEditClick} sx={{ mt: 2 }}>
                                    Edit
                                </Button>
                            </>
                        )}
                    </Box>
                </Box>
            </Box>
        </Box>
    );
};

export default Profile;
