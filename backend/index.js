const cookieParser = require('cookie-parser');
const express = require('express');
const cors = require('cors');
const routes = require('./src/app/routes');

const app = express();
const port = process.env.PORT || 5000;

require('./src/app/database'); // conexão com banco de dados

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(cookieParser());

app.use(routes);

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});