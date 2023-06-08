const express = require('express');
const app = express();
const mongoose = require('mongoose');
const { PORT, MONGO_URI } = require('../config');
const routes = require('./routes/routes');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
})
    .then(() => console.log('Connected to MongoDB...'))
    .catch(err => console.error('Could not connect to MongoDB...', err));

app.use('/functionup/', routes)



app.listen(PORT ||3000, () => {
    console.log('Listening on port ', PORT||3000);
})