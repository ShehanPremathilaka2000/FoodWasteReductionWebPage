import React, { useState, useEffect } from 'react';
import { Box, Button, Container, Grid, TextField, MenuItem, Select, InputLabel, FormControl } from '@mui/material';
import BuyerCard from '../components/BuyerCard';

const Buyer: React.FC = () => {
    const [items, setItems] = useState([]);
    const [categories, setCategories] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [expireDate, setExpireDate] = useState('');
    const [category, setCategory] = useState('');
    const [minPrice, setMinPrice] = useState('');
    const [maxPrice, setMaxPrice] = useState('');
    const [town, setTown] = useState('');

    useEffect(() => {
        fetch('http://localhost:5000/api/items/getAllItems', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then((response) => response.json())
            .then((data) => setItems(data.result))
            .catch((error) => console.error('Error fetching items:', error));

        fetch('http://localhost:5000/api/masterData/getTypesData')
            .then((response) => response.json())
            .then((data) => setCategories(data.result))
            .catch((error) => console.error('Error fetching categories:', error));
    }, []);

    console.log('CATEGORIES', categories);

    const filteredCards = items.filter((item) => {
        const matchesName = item.item_name.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesDate = expireDate ? new Date(item.expire_date) >= new Date(expireDate) : true;
        const matchesCategory = category ? item.type === category : true;
        const matchesPrice = (minPrice ? item.price >= minPrice : true) && (maxPrice ? item.price <= maxPrice : true);
        const matchesTown = town ? item.town.toLowerCase().includes(town.toLowerCase()) : true;

        return matchesName && matchesDate && matchesCategory && matchesPrice && matchesTown;
    });

    return (
        <Box sx={{ width: '100vw', minHeight: '100vh', backgroundColor: '#f5f5f5' }}>
            <Box sx={{ display: 'flex', justifyContent: 'center', mb: 3, backgroundColor: 'rgba(18, 222, 22, 0.1)' }}>
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', height: '100%', color: 'white', m: 2 }}>
                    <Container sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', gap: 2 }}>
                        <TextField
                            label="Search by"
                            variant="outlined"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            margin="normal"
                            sx={{ backgroundColor: 'white', borderRadius: '5px' }}
                        />
                        <TextField
                            label="Expire Date"
                            type="date"
                            variant="outlined"
                            value={expireDate}
                            onChange={(e) => setExpireDate(e.target.value)}
                            InputLabelProps={{
                                shrink: true,
                            }}
                            margin="normal"
                            sx={{ backgroundColor: 'white', borderRadius: '5px' }}
                        />
                        <FormControl variant="outlined" sx={{ minWidth: 120, backgroundColor: 'white', borderRadius: '5px' }} margin="normal">
                            <InputLabel>Category</InputLabel>
                            <Select value={category} onChange={(e) => setCategory(e.target.value)} label="Category">
                                {categories.map((cat) => (
                                    <MenuItem key={cat.id} value={cat.type}>
                                        {cat.type}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <TextField
                            label="Min Price"
                            variant="outlined"
                            type="number"
                            value={minPrice}
                            onChange={(e) => setMinPrice(e.target.value)}
                            margin="normal"
                            sx={{ backgroundColor: 'white', borderRadius: '5px' }}
                        />
                        <TextField
                            label="Max Price"
                            variant="outlined"
                            type="number"
                            value={maxPrice}
                            onChange={(e) => setMaxPrice(e.target.value)}
                            margin="normal"
                            sx={{ backgroundColor: 'white', borderRadius: '5px' }}
                        />
                        <TextField
                            label="Search by Town"
                            variant="outlined"
                            value={town}
                            onChange={(e) => setTown(e.target.value)}
                            margin="normal"
                            sx={{ backgroundColor: 'white', borderRadius: '5px' }}
                        />
                        <Button
                            variant="contained"
                            color="success"
                            onClick={() => {
                                setSearchTerm('');
                                setExpireDate('');
                                setCategory('');
                                setMinPrice('');
                                setMaxPrice('');
                                setTown('');
                            }}
                        >
                            Reset
                        </Button>
                    </Container>
                </Box>
            </Box>
            <Box sx={{ padding: 2, paddingLeft: 5 }}>
                <Grid container spacing={3} justifyContent="left">
                    {filteredCards.map((card, index) => (
                        <Grid item key={index}>
                            <BuyerCard
                                image={card.photo}
                                name={card.item_name}
                                description={card.description}
                                expDate={card.expire_date}
                                category={card.type}
                                categoryDescription={card.type_desc}
                                quentity={card.quentity}
                                quentityType={card.quantity_symbol}
                                price={card.price}
                                shopImage={card.shop_pic}
                                shopName={card.seller_name}
                                email={card.email}
                                tp={card.tp}
                                address={card.address}
                                location={card.location}
                                town={card.town}
                            />
                        </Grid>
                    ))}
                </Grid>
            </Box>
        </Box>
    );
};

export default Buyer;
