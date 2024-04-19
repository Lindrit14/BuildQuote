const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const passport = require('passport');
const session = require('express-session');

const userRoutes = require('./routes/userRoutes');
require("./auth/passport-setup");

dotenv.config();
const app = express();

function isLoggenIn(req,res,next){
    if(req.user){
        next();
    }else{
        res.sendStatus(401);
    }
}

// Configure CORS to accept requests from your frontend and handle credentials
app.use(cors({
    origin: "http://localhost:5173", // Adjust this to match your frontend URL
    credentials: true // This is essential for cookies to be sent and received
}));

app.use(express.json()); // Middleware to parse JSON bodies

// Configure express-session BEFORE initializing passport
app.use(session({
    secret: process.env.SESSION_SECRET, 
    resave: false,
    saveUninitialized: false,
   
}));

// Initialize Passport and session management
app.use(passport.initialize());
app.use(passport.session());

// Define routes
app.get('/auth/google',
 passport.authenticate('google', {
    scope: ['profile', 'email']
 })
);

app.get('/auth/google/redirect',
 passport.authenticate('google', {
    // User is authenticated at this point, redirect them to the frontend or another page
    successRedirect: "/protected",
    failureRedirect: "/auth/failire",
}));

app.get("/protected" ,isLoggenIn,(req, res)=>{
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

app.get("/logout", (req,res)=>{
    req.logout();
    req.session.destroy();
    res.send("GoodBye! You are now logged out.");
})

app.get("/auth/failire" ,(req, res)=>{
    res.send("Something went wrong woth the authorization/Logging In")
})




app.get('/profile', (req, res) => {
    if (req.isAuthenticated()) {
        res.send(`Hello ${req.user.name}! Welcome back!`);
    } else {
        res.redirect('/auth/google');
    }
});



app.get('/api/data', (req, res) => {
    res.json({ message: "Rina is the most beautiful girl on the world!" });
});

app.use('/api', userRoutes);  

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));

app.get('/', (req, res) => res.send('Hello World!'));



const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
