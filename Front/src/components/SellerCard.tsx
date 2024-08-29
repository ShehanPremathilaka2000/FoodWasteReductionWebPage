import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import { Box, CardActions, CardHeader, Collapse, Divider, Grid, Icon, IconButton, Tooltip, Badge } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { IconButtonProps } from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import DeleteConf from '../pages/DeleteConf';
import promotedImg from '../../public/promoted.png';

interface SellerCardProps {
    id: number;
    image?: any;
    name?: string;
    description?: string;
    expDate?: any;
    category?: string;
    categoryDescription?: string;
    quentity?: number;
    quentityType?: string;
    price?: number;
    sellerId?: number;
    onDelete?: any;
    quentityTypeId?: number;
    categoryId?: number;
    promoted?: number;
    user: any;
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

const Ribbon = styled('div')({
    width: 0,
    height: 0,
    borderLeft: '30px solid transparent',
    borderRight: '30px solid transparent',
    borderBottom: '30px solid gold',
    position: 'absolute',
    top: 0,
    right: 0,
    transform: 'rotate(45deg)',
    zIndex: 1,
    '&::before': {
        content: '"Promoted"',
        position: 'absolute',
        top: -20,
        left: -15,
        width: 70,
        textAlign: 'center',
        fontSize: 10,
        fontWeight: 'bold',
        color: '#fff',
        transform: 'rotate(-45deg)',
    },
});

const SellerCard: React.FC<SellerCardProps> = (props) => {
    const {
        id,
        image,
        name,
        description,
        expDate,
        category,
        categoryDescription,
        quentity,
        quentityType,
        price,
        sellerId,
        onDelete,
        quentityTypeId,
        categoryId,
        promoted,
        user,
    } = props;
    const [openDelete, setOpenDelete] = useState(false);
    const [imageURL, setImageURL] = useState<string | undefined>();

    const [expanded, setExpanded] = useState(false);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    const navigate = useNavigate();
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

    const onClickEdit = () => {
        navigate('/add-edit-listings', {
            state: {
                add: false,
                initialData: {
                    name: name,
                    description: description,
                    expDate: expDate,
                    category: categoryId,
                    categoryDescription: categoryDescription,
                    quentity: quentity,
                    quentityType: quentityTypeId,
                    price: price,
                    photo: image,
                    sellerId: sellerId,
                    itemId: id,
                },
                user: user,
            },
        });
    };

    const onClickDelete = () => {
        setOpenDelete(true);
    };

    const handleCloseDelete = () => {
        setOpenDelete(false);
    };

    const handleConfirmDelete = () => {
        fetch('http://localhost:5000/api/items/deleteItem', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ itemId: id }),
        }).then(() => {
            setOpenDelete(false);
            if (onDelete) {
                onDelete();
            }
        });
    };

    const onClickPromote = () => {
        navigate('/promote-item', {
            state: {
                itemId: id,
                itemName: name,
                user: user,
                sellerId: sellerId,
            },
        });
    };

    return (
        <Card sx={{ width: '18vw', position: 'relative', border: promoted ? '2px solid gold' : 'none',
                boxShadow: promoted ? '0 4px 8px rgba(0, 0, 0, 0.2)' : 'none' }} ref={cardRef}>
                    {promoted ? <Ribbon /> : null}
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <CardHeader
                    sx={{ pb: 1, mb: 0, display: 'flex', justifyContent: 'center', alignItems: 'center' }}
                    title={
                        <Typography
                            variant="h5"
                            fontWeight="bold"
                            component="div"
                            color="#4e9a11"
                            sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
                        >
                            {name}
                        </Typography>
                    }
                    subheader={
                        <Typography variant="body2" color="#4e9a11" sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <Tooltip title={categoryDescription}>
                                <span>{category}</span>
                            </Tooltip>
                        </Typography>
                    }
                />
            </Box>
            <CardMedia component="img" height="140" image={imageURL} />
            <CardContent sx={{ pb: 0, mb: 0 }}>
                <Grid container justifyContent="space-between">
                    <Grid item>
                        <Typography variant="body2" color="text.secondary">
                            Exp Date:
                        </Typography>
                    </Grid>
                    <Grid item>
                        <Typography variant="body2" color="text.secondary" align="right">
                            {new Date(expDate).toLocaleDateString()}
                        </Typography>
                    </Grid>
                </Grid>
                <Grid container justifyContent="space-between">
                    <Grid item>
                        <Typography variant="body2" color="text.secondary">
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
                        <Typography variant="body2" color="text.secondary">
                            Price:
                        </Typography>
                    </Grid>
                    <Grid item>
                        <Typography variant="body2" color="text.secondary" align="right">
                            {price}.00
                        </Typography>
                    </Grid>
                </Grid>
            </CardContent>
            <CardActions disableSpacing sx={{ p: 0, m: 0, ml: 2, mr: 2 }}>
                <IconButton onClick={onClickEdit}>
                    <EditIcon />
                </IconButton>
                <IconButton onClick={onClickDelete}>
                    <DeleteIcon />
                </IconButton>
                {promoted === 0 ? <IconButton onClick={onClickPromote}>
                    <ArrowUpwardIcon />
                </IconButton> : null}
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
            <DeleteConf open={openDelete} handleClose={handleCloseDelete} handleConfirm={handleConfirmDelete} />
        </Card>
    );
};

export default SellerCard;
