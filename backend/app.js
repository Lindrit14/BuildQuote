const express = require('express');
const session = require('express-session');
const cors = require('cors'); 

const passport = require('./config/passport');
const connectDB = require('./config/db'); 
const userRoutes = require('./routes/userRoutes');
const authRoutes = require('./routes/authRoutes');
const authMiddleware = require('./middleware/authMiddleware');

const app = express();

connectDB();

// Middleware to parse JSON bodies
app.use(express.json());

// Configure CORS to accept requests from your frontend and handle credentials
app.use(cors({
    origin: "http://localhost:5173", 
    credentials: true // This is essential for cookies to be sent and received
}));

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
}));

app.use(passport.initialize());
app.use(passport.session());

app.use('/api/users', userRoutes);
app.use('/auth', authRoutes)


app.get("/protected" ,authMiddleware.isLoggedIn,(req, res)=>{
    let userName = req.user.name
    let userProfilePictureURL = req.user.picture
    console.log(userProfilePictureURL)
    console.log(userName)
    
    console.log(req.user)
    res.send(`
    <body>
    <h1>Welcome to My Home Page, ${userName}</h1>
    <p>This is a simple HTML response.</p>
    <img src="${userProfilePictureURL}" alt="Sample Image">
    </body>`)
})


app.get('/', (req, res) => res.send('Hello World!'));



module.exports = app;
