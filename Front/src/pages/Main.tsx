import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Grid, Box, Card, CardActionArea, CardMedia, CardContent, Typography } from '@mui/material';
import mainBack from '../../public/mainBack.png';
import buyer from '../../public/buyer.png';
import seller from '../../public/seller.png';

const Main: React.FC = () => {
    const navigate = useNavigate();

    return (
        <Box
            sx={{
                height: '100vh',
                width: '100vw',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                backgroundImage: `url(${mainBack})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
            }}
        >
            <Container>
                <Grid container spacing={10} justifyContent="center" sx={{ height: '500px', padding: '50px' }}>
                    <Grid item xs={20} sm={20} md={6}>
                        <Card>
                            <CardActionArea onClick={() => navigate('/buyer')}>
                                <CardMedia component="img" image={buyer} alt="Buyer" />
                                <CardContent sx={{ backgroundColor: 'green' }}>
                                    <Typography
                                        gutterBottom
                                        variant="h4"
                                        component="div"
                                        sx={{
                                            display: 'flex',
                                            justifyContent: 'center',
                                            alignContent: 'center',
                                            alignItems: 'center',
                                            backgroundColor: 'green',
                                            fontWeight: 'bold',
                                            fontStyle: 'italic',
                                            letterSpacing: '0.3em',
                                        }}
                                    >
                                        Buyer
                                    </Typography>
                                </CardContent>
                            </CardActionArea>
                        </Card>
                    </Grid>
                    <Grid item xs={12} sm={6} md={6}>
                        <Card>
                            <CardActionArea onClick={() => navigate('/Login')}>
                                <CardMedia component="img" image={seller} alt="Seller" />
                                <CardContent sx={{ backgroundColor: 'green' }}>
                                    <Typography
                                        gutterBottom
                                        variant="h4"
                                        component="div"
                                        sx={{
                                            display: 'flex',
                                            justifyContent: 'center',
                                            alignContent: 'center',
                                            alignItems: 'center',
                                            backgroundColor: 'green',
                                            fontWeight: 'bold',
                                            fontStyle: 'italic',
                                            letterSpacing: '0.3em',
                                        }}
                                    >
                                        Seller
                                    </Typography>
                                </CardContent>
                            </CardActionArea>
                        </Card>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    );
};

export default Main;
