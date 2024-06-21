import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Main from './pages/Main';
import Login from './pages/Login';
import Buyer from './pages/Buyer';
import Profile from './pages/Profile';
import Register from './pages/Register';
import Seller from './pages/Seller';
import AddEditListings from './pages/AddEditListnings';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Main />} />
                <Route path="/main" element={<Main />} />s
                <Route path="/login" element={<Login />} />
                <Route path="/buyer" element={<Buyer />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/register" element={<Register />} />
                <Route path="/seller" element={<Seller />} />
                <Route path="/add-edit-listings" element={<AddEditListings />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
