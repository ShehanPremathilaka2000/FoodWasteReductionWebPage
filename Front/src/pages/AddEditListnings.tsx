import { Box, Button, Grid, MenuItem, TextField, Tooltip, Typography, Paper } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import NavBar from '../components/NavBar';

const AddEditListings = () => {
    const location = useLocation();
    const { initialData, add, user } = location.state || {};
    const navigate = useNavigate();
    const [categories, setCategories] = useState<any[]>([]);
    const [quentityTypes, setQuentityTypes] = useState<any[]>([]);
    const [imageURL, setImageURL] = useState<string | undefined>();
    const [initialPhoto, setInitialPhoto] = useState<any>(null);

    const [itemData, setItemData] = useState({
        name: '',
        description: '',
        photo: null,
        expDate: '',
        category: '',
        categoryDescription: '',
        quentity: '',
        quentityType: '',
        price: '',
        sellerId: '',
        itemId: '',
    });

    const [photo, setPhoto] = useState<File | null>(null);

    useEffect(() => {
        if (initialData) {
            setItemData(initialData);
            setInitialPhoto(initialData.photo);
        }

        fetch('http://localhost:5000/api/masterData/getTypesData')
            .then((response) => response.json())
            .then((data) => setCategories(data.result))
            .catch((error) => console.error('Error fetching categories:', error));

        fetch('http://localhost:5000/api/masterData/getQuentitySymbol')
            .then((response) => response.json())
            .then((data) => setQuentityTypes(data.result))
            .catch((error) => console.error('Error fetching quantity types:', error));
    }, [initialData]);

    useEffect(() => {
        if (initialData?.photo && initialData?.photo?.data) {
            const blob = new Blob([new Uint8Array(initialData.photo.data)], {
                type: initialData.photo.type,
            });
            const url = URL.createObjectURL(blob);
            setImageURL(url);
            return () => URL.revokeObjectURL(url); // Cleanup
        } else {
            console.error('Invalid image prop. Expected an object with type and data properties.');
        }
    }, [initialData]);

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setItemData({
            ...itemData,
            [e.target.name]: e.target.value,
        });
    };

    const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setPhoto(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setItemData({
                    ...itemData,
                    photo: reader.result as string,
                });
                setImageURL(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('name', itemData.name);
        formData.append('description', itemData.description);
        formData.append('expDate', itemData.expDate);
        formData.append('category', itemData.category);
        formData.append('quantity', itemData.quentity.toString());
        formData.append('quantityType', itemData.quentityType);
        formData.append('price', itemData.price.toString());

        if (photo) {
            formData.append('photo', photo);
        } else if (initialPhoto) {
            const blob = new Blob([new Uint8Array(initialPhoto.data)], { type: initialPhoto.type });
            const file = new File([blob], 'initialPhoto.png', { type: initialPhoto.type });
            formData.append('photo', file);
        }

        if (add) {
            formData.append('sellerId', itemData.sellerId.toString());
            fetch('http://localhost:5000/api/items/addItem', {
                method: 'POST',
                body: formData,
            })
                .then((response) => response.json())
                .then(() => {
                    navigate('/seller', { state: { userId: itemData.sellerId } });
                })
                .catch((error) => console.error('Error adding item:', error));
        } else {
            formData.append('itemId', itemData.itemId.toString());
            fetch('http://localhost:5000/api/items/updateItem', {
                method: 'POST',
                body: formData,
            })
                .then((response) => response.json())
                .then(() => {
                    navigate('/seller', { state: { userId: itemData.sellerId } });
                })
                .catch((error) => console.error('Error updating item:', error));
        }
    };

    const getCurrentDate = () => {
        const date = new Date();
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    console.log("Navigate", user)

    return (
        <Box sx={{ minHeight: '100vh', width: '100vw', backgroundColor: '#f5f5f5' }}>
            <NavBar user={user} />
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    minHeight: 'calc(100vh - 64px)',
                }}
            >
                <Paper
                    elevation={3}
                    sx={{
                        width: '100%',
                        maxWidth: 800,
                        padding: 4,
                        borderRadius: 2,
                    }}
                >
                    <Typography variant="h4" component="h1" gutterBottom align="center">
                        {add ? 'Add Item' : 'Edit Item'}
                    </Typography>
                    <form onSubmit={handleSubmit}>
                        <Grid container spacing={3}>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    label="Name"
                                    name="name"
                                    value={itemData.name}
                                    onChange={handleChange}
                                    required
                                    variant="outlined"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    label="Description"
                                    name="description"
                                    value={itemData.description}
                                    onChange={handleChange}
                                    multiline
                                    rows={4}
                                    required
                                    variant="outlined"
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    fullWidth
                                    label="Expiration Date"
                                    name="expDate"
                                    type="date"
                                    value={formatDate(itemData.expDate)}
                                    onChange={handleChange}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    inputProps={{
                                        min: getCurrentDate(),
                                    }}
                                    required
                                    variant="outlined"
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    fullWidth
                                    select
                                    label="Category"
                                    name="category"
                                    value={itemData.category}
                                    onChange={handleChange}
                                    required
                                    variant="outlined"
                                >
                                    {categories.map((option) => (
                                        <MenuItem key={option.id} value={option.id}>
                                            <Tooltip title={option.description}>
                                                <span>{option.type}</span>
                                            </Tooltip>
                                        </MenuItem>
                                    ))}
                                </TextField>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    fullWidth
                                    label="Quantity"
                                    name="quentity"
                                    type="number"
                                    value={itemData.quentity}
                                    onChange={handleChange}
                                    required
                                    variant="outlined"
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    fullWidth
                                    select
                                    label="Quantity Type"
                                    name="quentityType"
                                    value={itemData.quentityType}
                                    onChange={handleChange}
                                    required
                                    variant="outlined"
                                >
                                    {quentityTypes.map((option) => (
                                        <MenuItem key={option.id} value={option.id}>
                                            {option.symbol}
                                        </MenuItem>
                                    ))}
                                </TextField>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    fullWidth
                                    label="Price"
                                    name="price"
                                    type="number"
                                    value={itemData.price}
                                    onChange={handleChange}
                                    required
                                    variant="outlined"
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <Button variant="contained" component="label" fullWidth>
                                    Upload Photo
                                    <input type="file" id="photo" hidden accept="image/*" onChange={handlePhotoChange} />
                                </Button>
                                {itemData.photo && (
                                    <Box mt={2}>
                                        <img src={imageURL} alt="Selected" style={{ width: '100%', maxHeight: 200 }} />
                                    </Box>
                                )}
                            </Grid>
                            <Grid item xs={12}>
                                <Button type="submit" variant="contained" color="primary" fullWidth>
                                    {add ? 'Add Item' : 'Update Item'}
                                </Button>
                            </Grid>
                        </Grid>
                    </form>
                </Paper>
            </Box>
        </Box>
    );
};

export default AddEditListings;
