const passport = require('passport');


exports.login = (req, res, next) => {
    console.log("Initiating Google OAuth");
    passport.authenticate('google', {
        scope: ['profile', 'email']
    })(req, res, next);
};

exports.redirect = (req, res, next) => {
    console.log("Redirectiing Google OAuth");
    passport.authenticate('google', (err, user, info) => {
        if (err) {
            return next(err);
        }
        if (!user) {
            return res.redirect('/auth/failure');
        }
        req.logIn(user, function(err) {
            if (err) {
                return next(err);
            }
            return res.redirect('/check');
        });
    })(req, res, next);
};

exports.logout = (req, res) => {
    req.logout();
    req.session.destroy(() => {
        res.clearCookie('connect.sid');
        res.send("Goodbye! You are now logged out.");
    });
};

exports.failure = (req, res) => {
    res.send("Something went wrong with the authorization/Logging In");
};
