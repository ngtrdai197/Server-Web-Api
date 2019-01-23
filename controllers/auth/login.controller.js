const User = require('../../models/user.model');
const jwt = require('../../config/jwt');
const jwtToken = require('jsonwebtoken');

exports.login = (req, res) => {
    User.findOne({ 'UserName': req.body.UserName }).then(_user => {
        if (_user) {
            if (req.body.UserName === _user.UserName && req.body.Password === _user.Password) {
                const token = jwtToken.sign({ sub: _user._id, role: _user.Role }, jwt.jwt_Secret, { expiresIn: 60 * 60 });
                return res.status(200).json({ data: _user.FullName })
            }
        }
    })
}