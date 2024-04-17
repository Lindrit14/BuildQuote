const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');


const userRoutes = require('./routes/userRoutes');



dotenv.config();
const app = express();
app.use(cors());

app.use(express.json()); // Middleware to parse JSON bodies

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

app.get('/', (req, res) => res.send('Hello World!'));



app.get('/api/data', (req, res) => {
  res.json({ message: "Rina is the most beautiful girl on the world!" });
});

app.use('/api', userRoutes);  

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
