const express = require('express');
const dotenv = require('dotenv');
const app = require('./app');  // make sure the path to app.js is correct

dotenv.config();
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
