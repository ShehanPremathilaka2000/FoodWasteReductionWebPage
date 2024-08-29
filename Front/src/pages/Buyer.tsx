import React, { useState, useEffect } from 'react';
import { Box, Button, Container, Grid, TextField, MenuItem, Select, InputLabel, FormControl, IconButton, Drawer } from '@mui/material';
import Slider from 'react-slick';
import FilterAltRoundedIcon from '@mui/icons-material/FilterAltRounded';
import BuyerCard from '../components/BuyerCard';
import SliderCard from '../components/SliderCard';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const Buyer: React.FC = () => {
    const [items, setItems] = useState([]);
    const [promotedItems, setPromotedItems] = useState([]);
    const [categories, setCategories] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [expireDate, setExpireDate] = useState('');
    const [category, setCategory] = useState('');
    const [minPrice, setMinPrice] = useState('');
    const [maxPrice, setMaxPrice] = useState('');
    const [town, setTown] = useState('');
    const [filterOpen, setFilterOpen] = useState(false);

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

        fetch('http://localhost:5000/api/items/getPromotedItems', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then((response) => response.json())
            .then((data) => setPromotedItems(data.result))
            .catch((error) => console.error('Error fetching promoted items:', error));

        fetch('http://localhost:5000/api/masterData/getTypesData')
            .then((response) => response.json())
            .then((data) => setCategories(data.result))
            .catch((error) => console.error('Error fetching categories:', error));
    }, []);

    const filteredCards = items.filter((item) => {
        const matchesName = item.item_name.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesDate = expireDate ? new Date(item.expire_date) >= new Date(expireDate) : true;
        const matchesCategory = category ? item.type === category : true;
        const matchesPrice = (minPrice ? item.price >= minPrice : true) && (maxPrice ? item.price <= maxPrice : true);
        const matchesTown = town ? item.town.toLowerCase().includes(town.toLowerCase()) : true;

        return matchesName && matchesDate && matchesCategory && matchesPrice && matchesTown;
    });

    const sliderSettings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 6,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 1000,
        pauseOnHover: true,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    infinite: true,
                    dots: true,
                },
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    initialSlide: 2,
                },
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                },
            },
        ],
    };

    return (
        <Box sx={{ width: '100vw', minHeight: '100vh', backgroundColor: '#f5f5f5' }}>
            <Box sx={{ display: 'flex', justifyContent: 'center', mb: 3, backgroundColor: 'rgba(18, 222, 22, 0.1)' }}>
                <IconButton
                    sx={{
                        position: 'absolute',
                        left: '10px',
                        top: '10px',
                        backgroundColor: 'rgba(255, 225, 235)',
                        borderBlockColor: 'gray',
                        borderBottom: 'solid red',
                        borderLeft: 'solid red',
                        borderRight: 'solid red',
                        borderTop: 'solid red',
                    }}
                    onClick={() => setFilterOpen(!filterOpen)}
                >
                    <FilterAltRoundedIcon sx={{ color: 'black' }} />
                </IconButton>
                <Drawer open={filterOpen} onClose={() => setFilterOpen(false)}>
                    <Box sx={{ width: 250, p: 2 }}>
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
                    </Box>
                </Drawer>
            </Box>
            <Box sx={{ p:20, background: 'rgba(18, 222, 22)', p: 2 }}>
                <Box sx={{ pl: 22, pb: 2, width: '80vw' }}>
                    <Slider {...sliderSettings}>
                        {promotedItems.map((item, index) => (
                            <div key={index}>
                                <SliderCard
                                    image={item.photo}
                                    name={item.item_name}
                                    description={item.description}
                                    expDate={item.expire_date}
                                    category={item.type}
                                    categoryDescription={item.type_desc}
                                    quentity={item.quentity}
                                    quentityType={item.quantity_symbol}
                                    price={item.price}
                                    shopImage={item.shop_pic}
                                    shopName={item.seller_name}
                                    email={item.email}
                                    tp={item.tp}
                                    address={item.address}
                                    location={item.location}
                                    town={item.town}
                                    sx={{ border: '2px solid gold' }} // Highlight promoted items
                                />
                            </div>
                        ))}
                    </Slider>
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
