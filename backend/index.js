const express = require('express');
require('dotenv').config()
const bodyParser = require('body-parser');
const cors = require('cors')
const userRouters = require('./routers/users')
const bookRouters = require('./routers/books')
const borrowedRouters = require('./routers/borrowedBook')

const app = express();
const port = process.env.PORT

app.use(cors())
app.use(bodyParser.json());
app.use('/api/Users', userRouters)
app.use('/api/Books', bookRouters)
app.use('/api/Borrows', borrowedRouters)

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});