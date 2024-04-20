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
    cookie: {
        httpOnly: true,
        secure: false,  // Should be true in production with HTTPS
        sameSite: 'lax'  // Can be 'strict' or 'lax' depending on your needs
    }
}));

app.use(passport.initialize());
app.use(passport.session());

app.use('/api/',authMiddleware.isLoggedIn, userRoutes);
app.use('/auth', authRoutes)

app.get("/getCurrentUser", authMiddleware.isLoggedIn, (req, res) => {
    console.log("Session ID:", req.sessionID); // Log the session ID
    console.log("User session:", req.session); // Log the session object
    if (req.user) {
        res.json(req.user);
    } else {
        res.status(401).send({ error: "Not authenticated" });
    }
});

app.get("/check" ,authMiddleware.isLoggedIn,(req, res)=>{
    console.log("Logged In with" + req.user) //happens 3 times for some reason?
    res.redirect("http://localhost:5173/")    
})





module.exports = app;
