import NavBar from '../components/NavBar';
import SellerCard from '../components/SellerCard';
import { Box, Grid } from '@mui/material';
import { useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';

const Seller = () => {
    const location = useLocation();
    const { userId } = location.state || {};
    const [items, setItems] = useState([]);
    const [user, setUser] = useState({});

    const fetchItems = () => {
        fetch('http://localhost:5000/api/items/getListedItems', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ userId: userId }),
        })
            .then((response) => response.json())
            .then((data) => setItems(data.result))
            .catch((error) => console.error('Error fetching items:', error));
    };

    useEffect(() => {
        fetchItems();

        fetch('http://localhost:5000/api/auth/getUser', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ userId: userId }),
        })
            .then((response) => response.json())
            .then((data) => setUser(data.result[0]))
            .catch((error) => console.error('Error fetching user:', error));
    }, [userId]);

    const handleDelete = () => {
        fetchItems();
    };

    return (
        <Box sx={{ minHeight: '100vh', height: '100vh', width: '100vw', backgroundColor: '#f5f5f5' }}>
            <NavBar user={user} />
            <Box sx={{ padding: 2, paddingLeft: 5 }}>
                <Grid container spacing={3} justifyContent="left">
                    {items.map((item, index) => (
                        <Grid item key={index}>
                            <SellerCard
                                id={item.id}
                                image={item.photo}
                                name={item.item_name}
                                description={item.description}
                                shopImage={item.shop_pic}
                                expDate={item.expire_date}
                                category={item.type}
                                categoryDescription={item.type_desc}
                                quentity={item.quentity}
                                quentityType={item.symbol}
                                price={item.price}
                                onDelete={handleDelete}
                                quentityTypeId={item.quantity_symbol_id}
                                categoryId={item.type_id}
                                sellerId={userId}
                                user={user}
                            />
                        </Grid>
                    ))}
                </Grid>
            </Box>
        </Box>
    );
};

export default Seller;
