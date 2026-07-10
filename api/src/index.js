const express = require('express');
const cors = require('cors');
require('dotenv').config();
const partsRouter = require('./routes/parts');
const authRouter = require('./routes/auth');
const usersRouter = require('./routes/users');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use('/parts', partsRouter);

app.use('/auth', authRouter);

app.use('/users', usersRouter);

app.get('/', (req, res) => {
    res.json({ message: 'DIS Shop API is running' });
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})