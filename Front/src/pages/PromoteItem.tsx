import { Box, Button, Grid, TextField, Typography, Paper } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import NavBar from '../components/NavBar';

const PromoteItem = () => {
    const location = useLocation();
    const { itemId, itemName, user, sellerId } = location.state || {};
    const navigate = useNavigate();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        fetch('http://localhost:5000/api/items/promoteItem', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ itemId: itemId }),
        })
            .then((response) => response.json())
            .then(() => {
                console.log("CAME");
                navigate('/seller', { state: { userId: sellerId } });
            })
            .catch((error) => console.error('Error promoting item:', error));
    };

    console.log(itemId, itemName, user, sellerId);

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
                        Promote Item : {itemName}
                    </Typography>
                    <form onSubmit={handleSubmit}>
                        <Grid container spacing={3}>
                            <Grid item xs={12}>
                                <TextField fullWidth label="Card Holedr Name" name="cardHoldersNamme"  variant="outlined" />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField fullWidth label="Card Number" name="cardNumber"  variant="outlined" />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField fullWidth label="Expiry Date" name="expDate"  variant="outlined" />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField fullWidth label="CVV" name="cvv" type='number'  variant="outlined" />
                            </Grid>
                            <Grid item xs={12}>
                                <Button type="submit" variant="contained" color="primary" fullWidth>
                                    Promote Item
                                </Button>
                            </Grid>
                        </Grid>
                    </form>
                </Paper>
            </Box>
        </Box>
    );
};

export default PromoteItem;
