import NavBar from '../components/NavBar';
import SellerCard from '../components/SellerCard';
import {
    Box,
    Button,
    Drawer,
    FormControl,
    FormControlLabel,
    FormLabel,
    Grid,
    IconButton,
    InputLabel,
    MenuItem,
    Radio,
    RadioGroup,
    Select,
    TextField,
} from '@mui/material';
import { useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import FilterAltRoundedIcon from '@mui/icons-material/FilterAltRounded';

const Seller = () => {
    const location = useLocation();
    const { userId } = location.state || {};
    const [items, setItems] = useState([]);
    const [user, setUser] = useState({});
    const [itemsType, setItemsType] = useState('all');
    const [categories, setCategories] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [expireDate, setExpireDate] = useState('');
    const [category, setCategory] = useState('');
    const [minPrice, setMinPrice] = useState('');
    const [maxPrice, setMaxPrice] = useState('');
    const [filterOpen, setFilterOpen] = useState(false);

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

        fetch('http://localhost:5000/api/masterData/getTypesData')
            .then((response) => response.json())
            .then((data) => setCategories(data.result))
            .catch((error) => console.error('Error fetching categories:', error));
    }, [userId]);

    const filteredCards = items.filter((item) => {
        const matchesName = item.item_name.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesDate = expireDate ? new Date(item.expire_date) >= new Date(expireDate) : true;
        const matchesCategory = category ? item.type === category : true;
        const matchesPrice = (minPrice ? item.price >= minPrice : true) && (maxPrice ? item.price <= maxPrice : true);
        const matchesType = itemsType === 'all' ? true : itemsType === 'promoted' ? item.promoted : !item.promoted;

        return matchesName && matchesDate && matchesCategory && matchesPrice && matchesType;
    });

    const handleDelete = () => {
        fetchItems();
    };

    return (
        <Box sx={{ minHeight: '100vh', height: '100vh', width: '100vw', backgroundColor: '#f5f5f5' }}>
            <NavBar user={user} />
            <IconButton sx={{ position: 'absolute', left: '80px', top: '10px' }} onClick={() => setFilterOpen(!filterOpen)}>
                <FilterAltRoundedIcon />
            </IconButton>
            <Drawer anchor="left" open={filterOpen} onClose={() => setFilterOpen(false)}>
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
                    <FormControl>
                        <RadioGroup row aria-labelledby="demo-row-radio-buttons-group-label" name="row-radio-buttons-group" defaultValue="all" onChange={(e)=>{setItemsType(e.target.value)}}>
                            <FormControlLabel value="all" control={<Radio />} label="All" />
                            <FormControlLabel value="promoted" control={<Radio />} label="Promoted" />
                            <FormControlLabel value="normal" control={<Radio />} label="Normal" />
                        </RadioGroup>
                    </FormControl>
                    <Button
                        variant="contained"
                        color="success"
                        onClick={() => {
                            setSearchTerm('');
                            setExpireDate('');
                            setCategory('');
                            setMinPrice('');
                            setMaxPrice('');
                            setItemsType('all');
                        }}
                    >
                        Reset
                    </Button>
                </Box>
            </Drawer>
            <Box sx={{ padding: 2, paddingLeft: 5 }}>
                <Grid container spacing={3} justifyContent="left">
                    {filteredCards.map((item, index) => (
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
                                promoted={item.promoted}
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
