import React, { useState, useEffect, useRef } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import {
    Avatar,
    Box,
    Button,
    CardActionArea,
    CardActions,
    CardHeader,
    Collapse,
    Divider,
    Grid,
    Icon,
    IconButton,
    Modal,
    Stack,
    Tooltip,
} from '@mui/material';
import ShopSummery from '../pages/ShopSummery';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { IconButtonProps } from '@mui/material/IconButton';
import { styled } from '@mui/material/styles';

interface SliderCardProps {
    image?: any;
    name?: string;
    description?: string;
    expDate?: any;
    category?: string;
    categoryDescription?: string;
    quentity?: number;
    quentityType?: string;
    price?: number;
    shopImage?: any;
    shopName?: string;
    email?: string;
    tp?: string;
    address?: string;
    location?: string;
    town?: string;
}

interface ExpandMoreProps extends IconButtonProps {
    expand: boolean;
}

const ExpandMore = styled((props: ExpandMoreProps) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
})(({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
    }),
}));

const style = {
    position: 'absolute' as const,
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

const SliderCard: React.FC<SliderCardProps> = (props) => {
    const {
        image,
        shopImage,
        name,
        description,
        expDate,
        category,
        categoryDescription,
        quentity,
        quentityType,
        price,
        shopName,
        email,
        tp,
        address,
        location,
        town,
    } = props;
    const [open, setOpen] = useState(false);
    const [imageURL, setImageURL] = useState<string | undefined>();
    const [shopImageURL, setShopImageURL] = useState<string | undefined>();
    const [expanded, setExpanded] = useState(false);
    const cardRef = useRef<HTMLDivElement>(null);

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

    useEffect(() => {
        if (shopImage && shopImage.data) {
            const blob = new Blob([new Uint8Array(shopImage.data)], {
                type: shopImage.type,
            });
            const url = URL.createObjectURL(blob);
            setShopImageURL(url);
            return () => URL.revokeObjectURL(url); // Cleanup
        } else {
            console.error('Invalid image prop. Expected an object with type and data properties.');
        }
    }, [shopImage]);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (cardRef.current && !cardRef.current.contains(event.target as Node)) {
                setExpanded(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    const handleProfileClick = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <Card sx={{ width: '12vw', position: 'relative' }} ref={cardRef}>
            <CardHeader
                sx={{ pb: 1, mb: 0, pt: 0, mt: 0 }}
                title={
                    <Grid>
                        <Grid container alignItems="center" justifyContent="space-between">
                            <Grid item xs>
                                <Typography fontWeight="bold" component="div" color="#4e9a11">
                                    {name}
                                </Typography>
                            </Grid>
                            <Grid item>
                                <IconButton aria-label="settings" onClick={handleProfileClick}>
                                    <Avatar alt="Shop" src={shopImageURL} />
                                </IconButton>
                            </Grid>
                        </Grid>
                        <Typography variant="body2" color="#4e9a11" sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <Tooltip title={categoryDescription}>
                                <span>{category}</span>
                            </Tooltip>
                        </Typography>
                    </Grid>
                }
            />
            <CardMedia component="img" height="80" image={imageURL} />
            <CardContent sx={{ pb: 0, mb: 0 }}>
                <Grid container justifyContent="space-between">
                    <Grid item>
                        <Typography variant="subtitle1" color="text.secondary">
                            Exp Date:
                        </Typography>
                    </Grid>
                    <Grid item>
                        <Typography variant="body6" color="text.secondary" align="right">
                            {new Date(expDate).toLocaleDateString()}
                        </Typography>
                    </Grid>
                </Grid>
                <Grid container justifyContent="space-between">
                    <Grid item>
                        <Typography variant="subtitle1" color="text.secondary">
                            Quantity:
                        </Typography>
                    </Grid>
                    <Grid item>
                        <Typography variant="body2" color="text.secondary" align="right">
                            {quentity} {quentityType}
                        </Typography>
                    </Grid>
                </Grid>
                <Grid container justifyContent="space-between">
                    <Grid item>
                        <Typography variant="subtitle1" color="text.secondary">
                            Price:
                        </Typography>
                    </Grid>
                    <Grid item>
                        <Typography variant="body2" color="text.secondary" align="right">
                            Rs.{price}
                        </Typography>
                    </Grid>
                </Grid>
            </CardContent>
            <CardActions disableSpacing sx={{ p: 0, m: 0, ml: 2, mr: 2 }}>
                <ExpandMore expand={expanded} onClick={handleExpandClick} aria-expanded={expanded} aria-label="show more">
                    <ExpandMoreIcon />
                </ExpandMore>
            </CardActions>
            <Collapse in={expanded} timeout="auto" unmountOnExit sx={{ backgroundColor: '#02030405' }}>
                <Divider />
                <CardContent style={{ padding: 3, margin: 3 }}>
                    <Typography paragraph style={{ padding: 3, margin: 3 }}>
                        {description}
                    </Typography>
                </CardContent>
            </Collapse>
            <Modal open={open} onClose={handleClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
                <Box sx={style}>
                    <ShopSummery image={shopImage} name={shopName} email={email} tp={tp} address={address} location={location} town={town} />
                </Box>
            </Modal>
        </Card>
    );
};

export default SliderCard;
