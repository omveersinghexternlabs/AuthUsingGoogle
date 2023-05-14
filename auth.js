import passport from "passport";
import GoogleS from 'passport-google-oauth2';
const GoogleStrategy = GoogleS.Strategy;
import FacebookS from 'passport-facebook';
const FacebookStrategy = FacebookS.Strategy;

import GitHubS from 'passport-github'
const GitHubStrategy = GitHubS.Strategy;


// import AppleS from "passport-appleid";
// const AppleStrategy = AppleS.Strategy;
 
// for github authenticate...
const GITHUB_CLIENT_ID = '18f2c16e3516f334d00e';
const GITHUB_CLIENT_SECRET = 'c8f53fb68d380a00af67ed1ab25f83331a7b5f78';

passport.use(new GitHubStrategy({
  clientID: GITHUB_CLIENT_ID,
  clientSecret: GITHUB_CLIENT_SECRET,
  callbackURL: "http://localhost:5000/auth/github/callback"
},
function(accessToken, refreshToken, profile, cb) {
  return cb(null, profile);
}
));


// for google authenticate...
const GOOGLE_CLIENT_ID = '921376947750-if6i12nmc1d0mhuac2osa956aaql9mb9.apps.googleusercontent.com';
const GOOGLE_CLIENT_SECRET = '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';

passport.use(new GoogleStrategy({
  clientID: GOOGLE_CLIENT_ID,
  clientSecret: GOOGLE_CLIENT_SECRET,
  callbackURL: 'http://localhost:5000/auth/google/callback',
  passReqToCallback: true,
},
function(request, accessToken, refreshToken, profile, done) {
  return done(null, profile);
}));


// for facebook authenticate...
const Facebook_CLIENT_ID = '1284030542192213';
const Facebook_CLIENT_SECRET = '85a322b17e76be286ffc5549f572e63b';

passport.use(new FacebookStrategy({
  clientID: Facebook_CLIENT_ID,
  clientSecret: Facebook_CLIENT_SECRET,
  callbackURL: 'http://localhost:5000/auth/facebook/callback',
}, function ( accessToken, refreshToken, profile, done) {
  return done(null, profile);
}
));


//for apple authenticate...
// const APPLE_SERVICE_ID = "demo_service_id";
// const APPLE_TEAM_ID = "demo_team_id";
// 
// passport.use(new AppleStrategy({
//   clientID: APPLE_SERVICE_ID,
//   callbackURL: 'http://localhost:5000/auth/apple/callback',
//   teamId: APPLE_TEAM_ID,
//   keyIdentifier: 'RB1233456',
//   privateKeyPath: "privatekey"
// }, 
// function(accessToken, refreshToken, profile, done) {
//   return done(null, profile);
// }
// ));

passport.serializeUser(function(user, cb) {
  cb(null, user);
});

passport.deserializeUser(function(user, cb) {
  cb(null, user);
});
