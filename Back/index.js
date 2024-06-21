//importing the dependencies
const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();

app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());
app.use(express.json());

const port = 5000;

require('./Routes/authRoute.js')(app);
require('./Routes/itemsRoute.js')(app);
require('./Routes/masterDataRoute.js')(app);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});