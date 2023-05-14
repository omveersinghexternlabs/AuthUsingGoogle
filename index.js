import session from "express-session";
import express from "express";
import passport from "passport";


import './auth.js';

const app = express();

function isLoggedIn(req, res, next) {
    req.user ? next() : res.sendStatus(401);
}

app.use(session({ secret: 'SECRET', resave: false, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

app.get('/', (req, res) => {
    res.send(`<a href="/auth/google"> Authenticate with Google </a> <br>  <br>
                <a href="/auth/facebook"> Login with Facebook </a> <br>  <br>
                <a href="/auth/apple"> Login with Apple --> not working</a> <br>  <br>
                <a href="/auth/github"> Login with Github </a>
    `);
});

app.get('/auth/google',
    passport.authenticate('google', { scope: ['email', 'profile'] }
    ));

app.get('/auth/github',
    passport.authenticate('github')
);

app.get('/auth/facebook',
    passport.authenticate('facebook', { scope: ['public_profile', 'email'] }
    ));

app.get('/auth/apple',
    passport.authenticate('apple')
);

app.get('/auth/github/callback',
    passport.authenticate('github', { failureRedirect: '/auth/github/failure' }),
    function (req, res) {
        // Successful authentication, redirect home.
        // res.send(`Hello ${req.user} from github...`);
        // console.log("user",req.user)
        res.json(`Hello ${req.user.username} from github...`);
        // res.json(req.user)
    });

app.get('/auth/facebook/callback',
    passport.authenticate('facebook',
        {
            successRedirect: '/protectedfb',
            failureRedirect: '/auth/facebook/failure'
        }));

app.get('/auth/google/callback',
    passport.authenticate('google',
        {
            successRedirect: '/protected',
            failureRedirect: '/auth/google/failure'
        })
);

app.get('/auth/apple/callback',
    passport.authenticate('apple',
        {
            successRedirect: '/protectedapple',
            failureRedirect: '/auth/apple/failure'
        })
);

app.get('/protectedapple', isLoggedIn, (req, res) => {
    res.send(`Hello ${req.user.displayName} from apple`);
});

app.get('/protectedfb', isLoggedIn, (req, res) => {
    res.send(`Hello ${req.user.displayName} from facebook`);
});

app.get('/protected', isLoggedIn, (req, res) => {
    
    res.send(`Hello ${req.user.displayName} from google`);
});

app.get('/logout', (req, res) => {
    req.session.destroy();
    res.send(`Goodbye! ${req.user.displayName}`);
});

app.get('/auth/google/failure', (req, res) => {
    res.send('Failed to authenticate.. via google');
});

app.get('/auth/facebook/failure', (req, res) => {
    res.send('Failed to authenticate..(via facebook)');
});

app.get('/auth/apple/failure', (req, res) => {
    res.send('Failed to authenticate..(via apple)');
});

app.get('/auth/github/failure', (req, res) => {
    res.send('Failed to authenticate..(via github)');
});



// ______________________________________FACEBOOK LOGIN __________________________________________________________________________



// const stringifiedParams = queryString.stringify({
//     client_id: 1284030542192213,
//     redirect_uri: 'http://localhost:5000/auth/facebook/',
//     scope: ['email', 'user_friends'].join(','),
//     response_type: 'code',
//     auth_type: 'rerequest',
//     display: 'popup',
// });


// const facebookLoginUrl = `https://www.facebook.com/v4.0/dialog/oauth?${stringifiedParams}`;




// ______________________________________FACEBOOK end __________________________________________________________________________





app.listen(5000, () => console.log('listening on port: 5000'));