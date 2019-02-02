const User = require('../../models/user.model');
const jwt = require('../../config/jwt.config');
const jwtToken = require('jsonwebtoken');

exports.login = (req, res) => {
    User.findOne({ 'UserName': req.body.UserName }).then(_user => {
        if (_user) {
            if (req.body.UserName === _user.UserName && req.body.Password === _user.Password) {
                const token = jwtToken.sign({ sub: _user._id, role: _user.Roles[0] }, jwt.jwt_Secret, { expiresIn: '3600s' });
                return res.status(200).json({ data: _user.UserName, token });
            }
        }
    })
}