const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const FacebookStrategy = require('passport-facebook');
const GitHubStrategy = require('passport-github').Strategy;

const passport = require('passport');
const secretKey = require('../config/jwt.config');
const User = require('../models/user.model');

exports.configStrategyJwt = () => {
    const opts = {}
    opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
    opts.secretOrKey = secretKey.jwt_Secret;
    passport.use(new JwtStrategy(opts, function (jwt_payload, done) {
        User.findById({ _id: jwt_payload.sub }, function (err, user) {
            if (err) {
                return done(err, false);
            }
            if (user) {
                return done(null, user);
            } else {
                return done(null, false);
                // or you could create a new account
            }
        });
    }))
};

exports.configStrategyFacebook = () => {
    passport.use(new FacebookStrategy({
        clientID: '484467022080870',
        clientSecret: '02a34c17f1b5ca02a869386303029c88',
        callbackURL: "http://localhost:8088/user/api/auth/fb",
        profileFields: ['email', 'gender', 'displayName']
    }, (accessToken, refreshToken, profile, cb) => {
        User.findById({ _id: profile.id }, (err, user) => {
            if (err) return done(err);
            if (user) return done(null, user);
            const newUser = new User({
                _id: profile._json.id,
                UserName: profile._json.email,
                FullName: profile._json.displayName,
                Email: profile._json.email,
                Gender: profile._json.gender,
            });
            console.log(newUser);

        });
        console.log(profile);
    }
    ));
}

exports.configStrategyGithub = () => {
    passport.use(new GitHubStrategy({
        clientID: 'cb75d72a1c15366a0683',
        clientSecret: 'e72df69011b4a406fbdf7c1997dfa0aa8fa65c47',
        callbackURL: "http://localhost:8088/user/api/auth/github"
    },
        function (accessToken, refreshToken, profile, cb) {
            User.findById({ _id: profile.id }).then(user => {
                if (!user) {
                    const newUser = new User({
                        _id: profile._json.id,
                        UserName: profile._json.login,
                        FullName: profile._json.name,
                        Email: profile._json.email,
                        Url: profile._json.avatar_url
                    });
                    newUser.save().then(_user => {
                        return res.status(200).send(_user);
                    }).catch(err => {
                        return res.status(500).send({ message: err.message });
                    })
                } else {
                    return res.status(200).send(user);
                }
            });
        }
    ));
}