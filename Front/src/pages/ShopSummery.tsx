import { useState, useEffect } from 'react';
import { Avatar, Box, Divider, Grid, Link, List, ListItem, ListItemText, Typography } from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';

interface ShopSummeryProps {
    image?: any;
    name?: string;
    email?: string;
    tp?: string;
    address?: string;
    location?: string;
    town?: string;
}

const ShopSummery: React.FC<ShopSummeryProps> = (props) => {
    const [imageURL, setImageURL] = useState<string | undefined>();
    const { image, name, email, tp, address, location, town } = props;

    useEffect(() => {
        if (image && image.data) {
            const blob = new Blob([new Uint8Array(image.data)], { type: image.type });
            const url = URL.createObjectURL(blob);
            setImageURL(url);
            return () => URL.revokeObjectURL(url); // Cleanup
        } else {
            console.error('Invalid image prop. Expected an object with type and data properties.');
        }
    }, [image]);

    const handleLinkClick = (event) => {
        event.preventDefault();
        window.open(location, '_blank');
    };

    return (
        <Box>
            <Box display="flex" flexDirection="column" alignItems="center">
                <Avatar alt={name} src={imageURL} sx={{ width: 150, height: 150 }} />
                <Box display="flex" flexDirection="column" alignItems="center">
                    <Typography variant="h4" component="h1" gutterBottom>
                        {name}
                    </Typography>
                </Box>
            </Box>
            <List sx={{ width: '100%', maxWidth: 600 }}>
                <ListItem>
                    <ListItemText
                        primary={
                            <Typography variant="subtitle1" fontWeight="bold">
                                Email
                            </Typography>
                        }
                        secondary={email}
                    />
                </ListItem>
                <Divider />
                <ListItem>
                    <ListItemText
                        primary={
                            <Typography variant="subtitle1" fontWeight="bold">
                                {
                                    <Typography variant="subtitle1" fontWeight="bold">
                                        Address
                                    </Typography>
                                }
                            </Typography>
                        }
                        secondary={tp}
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
                        secondary={town}
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
                                secondary={address}
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
        </Box>
    );
};

export default ShopSummery;
